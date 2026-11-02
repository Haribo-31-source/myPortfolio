export default function SkillsSkeleton() {
  return (
    <div
      className="skills skillsLoading"
      role="status"
      aria-label="Yetenekler yükleniyor"
      aria-busy="true"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div className="skill skillSkeleton" key={index} aria-hidden="true">
          <span className="skeletonLine skeletonTitle" />
          <span className="skeletonLine skeletonDescription" />
          <span className="skeletonLine skeletonDescription skeletonDescriptionShort" />
        </div>
      ))}
    </div>
  );
}
