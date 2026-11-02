export default function SkillLoading() {
  return (
    <div
      className="project projectLoading"
      role="status"
      aria-label="Yetenek detayı yükleniyor"
      aria-busy="true"
    >
      <div className="projectName skeletonLine skeletonTitle" aria-hidden="true" />
      <div className="projectCenter">
        <div className="image skillImageSkeleton" aria-hidden="true">
          <span className="skeletonBlock" />
        </div>
        <div className="texts skillTextsSkeleton" aria-hidden="true">
          <span className="skeletonLine skeletonTitle" />
          <span className="skeletonLine skeletonDescription" />
          <span className="skeletonLine skeletonDescription" />
          <span className="skeletonLine skeletonDescription skeletonDescriptionShort" />
        </div>
      </div>
    </div>
  );
}
