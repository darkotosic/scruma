from __future__ import annotations

import io
from dataclasses import dataclass

from django.core.files.base import ContentFile
from PIL import Image, ImageOps


@dataclass(frozen=True)
class ImageOptimizeSpec:
    # Максимална ширина/висина (пиксели). Ако је слика мања, не увећавамо је.
    max_px: int
    # Квалитет за WEBP.
    webp_quality: int = 82
    # Да ли да задржимо алфа канал (ако постоји).
    preserve_alpha: bool = True


def _safe_open(file_obj) -> Image.Image:
    file_obj.seek(0)
    im = Image.open(file_obj)
    im.load()
    return im


def _to_webp_bytes(im: Image.Image, *, quality: int, preserve_alpha: bool) -> bytes:
    # Коригуј оријентацију (EXIF) и нормализуј режим боја.
    im = ImageOps.exif_transpose(im)

    # WEBP подржава RGBA (алфа), па задржавамо ако треба.
    if preserve_alpha and ("A" in im.getbands() or im.mode in ("LA", "RGBA")):
        if im.mode != "RGBA":
            im = im.convert("RGBA")
    else:
        if im.mode not in ("RGB", "L"):
            im = im.convert("RGB")

    buf = io.BytesIO()
    im.save(
        buf,
        format="WEBP",
        quality=int(quality),
        method=6,
        optimize=True,
    )
    return buf.getvalue()


def optimize_image_field(
    instance,
    field_name: str,
    spec: ImageOptimizeSpec,
    *,
    force: bool = False,
) -> bool:
    """
    Оптимизује ImageField:
    - resize (thumbnail) до spec.max_px (без увећавања),
    - конверзија у WEBP,
    - замена фајла у пољу.

    Враћа True ако је поље промењено.
    """
    field = getattr(instance, field_name, None)
    if not field:
        return False

    file_obj = getattr(field, "file", None)
    if not file_obj:
        return False

    original_name = field.name or ""
    if (not force) and original_name.lower().endswith(".webp"):
        return False

    try:
        im = _safe_open(file_obj)
    except Exception:
        return False

    max_px = int(spec.max_px)
    if max_px > 0:
        im = ImageOps.exif_transpose(im)
        im.thumbnail((max_px, max_px), Image.Resampling.LANCZOS)

    try:
        data = _to_webp_bytes(im, quality=spec.webp_quality, preserve_alpha=spec.preserve_alpha)
    except Exception:
        return False

    # Ново име: задржи basename, само замени екстензију.
    base = original_name.rsplit("/", 1)[-1]
    base_no_ext = base.rsplit(".", 1)[0] if "." in base else base
    folder = original_name.rsplit("/", 1)[0] if "/" in original_name else ""
    new_name = f"{base_no_ext}.webp"
    if folder:
        new_name = f"{folder}/{new_name}"

    # Обриши стари фајл ако постоји и ако се име мења.
    storage = field.storage
    old_name = original_name
    if old_name and old_name != new_name and storage.exists(old_name):
        try:
            storage.delete(old_name)
        except Exception:
            pass

    field.save(new_name, ContentFile(data), save=False)
    return True
