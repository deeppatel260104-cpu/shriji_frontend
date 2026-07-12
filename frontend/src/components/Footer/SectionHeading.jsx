const SectionHeading = ({ children }) => (
  <>
    <h4 className="font-jost text-[#B8935A] text-[0.88rem] tracking-[0.22em] uppercase font-normal mb-5">
      {children}
    </h4>
    <div
      className="h-px w-20 mb-5"
      style={{ background: "linear-gradient(90deg, #B8935A, transparent)" }}
    />
  </>
);

export default SectionHeading;
