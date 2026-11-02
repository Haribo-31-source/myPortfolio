"use client";

import Image from "next/image";
import { useState } from "react";

function getPreviewUrl(src: string) {
  const uploadPath = "/image/upload/";
  if (!src.startsWith("https://res.cloudinary.com/") || !src.includes(uploadPath)) {
    return src;
  }

  return src.replace(uploadPath, `${uploadPath}w_32,q_20,e_blur:1000/`);
}

export default function ProgressiveSkillImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [previewReady, setPreviewReady] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const previewSrc = getPreviewUrl(src);

  return (
    <div className={`progressiveImage${imageLoaded ? " isLoaded" : ""}`}>
      {!previewReady && <span className="imageLoadingPlaceholder" aria-hidden="true" />}
      <Image
        src={previewSrc}
        alt=""
        fill
        sizes="(max-width: 500px) 90vw, 65vw"
        className="progressiveImagePreview"
        aria-hidden="true"
        onLoad={() => setPreviewReady(true)}
        onError={() => setPreviewReady(true)}
      />
      {previewReady && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 500px) 90vw, 65vw"
          className="progressiveImageFull"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}
      {imageFailed && <span className="imageLoadError">Görsel tam çözünürlükte yüklenemedi.</span>}
    </div>
  );
}
