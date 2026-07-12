const MapSection = () => {
  return (
    <section className="w-full py-16 bg-[#ede8e0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
  <div className="inline-flex items-center gap-3 mb-4">
    <div className="w-10 h-px bg-[#B8935A]" />
    <span className="font-jost font-normal text-[#B8935A] text-[11px] tracking-[4px] uppercase">
      Location
    </span>
    <div className="w-10 h-px bg-[#B8935A]" />
  </div>
  <h2 className="text-[clamp(28px,4vw,42px)] font-playfair font-medium leading-tight m-0">
    <em className="text-[#B8935A]">Find Us</em>
  </h2>
</div>
        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
           
          <iframe
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.6533335120635!2d72.66591277509336!3d23.073167679138365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85102af19a13%3A0x5d739b705f63e837!2sShriji%20Photo%20Studio!5e0!3m2!1sen!2sin!4v1774460533773!5m2!1sen!2sin" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;