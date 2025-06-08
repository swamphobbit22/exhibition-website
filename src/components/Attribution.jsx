export default function Attribution() {
  return (
    <section className=" bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
        <div className="pt-32 max-w-3xl mx-auto text-sm leading-relaxed">
        <h1 className="text-xl font-semibold mb-4">Data Sources and Attribution</h1>

        <p>
            <strong>MuseoNet Virtual Museum</strong> uses publicly available data from the following institutions.
            We respect and follow each institution’s guidelines for data usage.
        </p>

        <hr className="my-4" />

        <h2 className="font-medium mt-4">The Metropolitan Museum of Art</h2>
        <ul className="list-disc list-inside">
            <li>Source: <a href="https://metmuseum.github.io/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-accent)]">The Met Collection API</a></li>
            <li>License: Public domain (CC0 1.0)</li>
            <li>Attribution: “Data courtesy of The Metropolitan Museum of Art.”</li>
        </ul>

        <h2 className="font-medium mt-4">The Art Institute of Chicago</h2>
        <ul className="list-disc list-inside">
            <li>Source: <a href="https://api.artic.edu/docs/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-accent)]">Art Institute of Chicago API</a></li>
            <li>License: Varies by object (many are public domain)</li>
            <li>Attribution: “Data provided by the Art Institute of Chicago.”</li>
        </ul>

        <h2 className="font-medium mt-4">Smithsonian Institution</h2>
        <ul className="list-disc list-inside">
            <li>Source: <a href="https://www.si.edu/openaccess" target="_blank" rel="noopener noreferrer" className="text-[var(--text-accent)]">Smithsonian Open Access</a></li>
            <li>License: Varies (many items are CC0 1.0)</li>
            <li>Attribution: “Data and images from the Smithsonian Institution’s Open Access initiative.”</li>
        </ul>

        <hr className="my-4" />

        <p>
            MuseoNet Virtual Museum does not claim ownership of any artwork or metadata provided by these sources.
            All rights remain with the original institutions or rights holders. If you are a rights holder and have
            concerns, please contact us.
        </p>
        </div>
    </section>
  );
}
