export default function About() {
  return (
    <div>
      {/* Header */}
      <div className="bg-maroon py-14 text-center">
        <h1 className="font-serif text-cream text-4xl md:text-5xl mb-3">About Kavipushp</h1>
        <div className="flex items-center justify-center gap-3">
          <span className="h-px bg-gold/40 w-16" />
          <span className="text-gold">✦</span>
          <span className="h-px bg-gold/40 w-16" />
        </div>
      </div>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold font-sans text-xs tracking-widest mb-3">OUR STORY</p>
            <h2 className="font-serif text-maroon text-3xl mb-6">Tradition Woven into Every Bangle</h2>
            <p className="text-gray-600 font-sans text-sm leading-relaxed mb-4">
              Founded in 2015 in the heart of Sriganganagar, Rajasthan, Kavipushp was born from a deep
              love of bridal tradition and handcrafted jewellery. We believe every bride deserves to begin
              her new chapter adorned with pieces that carry both beauty and meaning.
            </p>
            <p className="text-gray-600 font-sans text-sm leading-relaxed mb-4">
              Our artisans craft each bridal chuda and bangle set with meticulous care, using the finest
              materials sourced across Rajasthan. From the vibrant reds of bridal chooda to the delicate
              gold-work on our bangles — every piece is a celebration.
            </p>
            <p className="text-gray-600 font-sans text-sm leading-relaxed">
              Over the years, we have had the privilege of being part of thousands of weddings, making
              Kavipushp the most trusted name in bridal jewellery in Sriganganagar.
            </p>
          </div>
          <div className="bg-cream-dark border border-gold/20 p-8 text-center">
            <div className="font-serif text-gold text-5xl mb-2">10+</div>
            <p className="text-gray-600 font-sans text-sm mb-6">Years of Craftsmanship</p>
            <div className="font-serif text-gold text-5xl mb-2">5000+</div>
            <p className="text-gray-600 font-sans text-sm mb-6">Happy Brides</p>
            <div className="font-serif text-gold text-5xl mb-2">100%</div>
            <p className="text-gray-600 font-sans text-sm">Pure Quality Guaranteed</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-maroon py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-cream text-3xl text-center mb-2">Visit or Contact Us</h2>
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="h-px bg-gold/40 w-16" />
            <span className="text-gold">✦</span>
            <span className="h-px bg-gold/40 w-16" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-cream/80">
            <div>
              <div className="text-gold text-3xl mb-3">📍</div>
              <h4 className="font-serif text-cream text-lg mb-2">Visit Us</h4>
              <p className="font-sans text-sm leading-relaxed">
                Kavipushp Jewellery<br/>
                Sriganganagar, Rajasthan<br/>
                335001
              </p>
            </div>
            <div>
              <div className="text-gold text-3xl mb-3">📞</div>
              <h4 className="font-serif text-cream text-lg mb-2">Call / WhatsApp</h4>
              <a href="tel:+91XXXXXXXXXX" className="font-sans text-sm hover:text-gold transition-colors block">+91 XXXXX XXXXX</a>
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer"
                 className="text-green-400 font-sans text-sm hover:text-green-300 mt-1 block">Chat on WhatsApp</a>
            </div>
            <div>
              <div className="text-gold text-3xl mb-3">🕐</div>
              <h4 className="font-serif text-cream text-lg mb-2">Store Hours</h4>
              <p className="font-sans text-sm leading-relaxed">
                Monday – Saturday<br/>
                10:00 AM – 8:00 PM<br/>
                <span className="text-cream/50">Sunday: Closed</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="h-64 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-400 font-sans text-sm">
          Google Map embed — add your coordinates here
        </p>
      </div>
    </div>
  );
}
