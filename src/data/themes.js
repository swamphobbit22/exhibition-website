 const themesArray = [
 {
    name: 'Neolithic',
    description: 'Dating from around 10,000–2,000 BCE, Neolithic art and artifacts includes pottery, stone tools, figurines, and early symbolic carvings. These objects reflect settled agricultural communities and often carry ritual or domestic significance.'
  },
  {
    name: 'Impressionism',
    description: 'An art movement from the 1860s–1880s in France, featuring artists like Claude Monet and Edgar Degas. Common subjects include landscapes and everyday life, painted with visible brushstrokes and an emphasis on light and atmosphere.'
  },
  {
    name: 'Africa',
    description: 'Spanning millennia and many cultures, African art includes ritual masks, wood carvings, textiles, and metalwork. Notable regions include the Yoruba, Benin, and Dogon cultures, with works often tied to ceremony or oral traditions.'
  },
  {
    name: 'Samurai',
    description: 'Centered on Japan’s warrior class from the 12th to 19th centuries, samurai-related art includes armor, swords, ink paintings, and woodblock prints. Items often reflect ideals of honor, nature, and Zen-influenced aesthetics.'
  },
  {
    name: 'Silk Road',
    description: 'From the 2nd century BCE to the 14th century CE, the Silk Road connected East and West. Artifacts include textiles, ceramics, manuscripts, and Buddhist imagery, influenced by Persian, Indian, Chinese, and Central Asian cultures.'
  },
  {
    name: 'Ancient Egypt',
    description: 'Spanning 3000 BCE to 30 BCE, Egyptian art includes tomb paintings, sculptures of gods and pharaohs, funerary objects like sarcophagi, and hieroglyphic inscriptions. Common themes are afterlife, divinity, and order.'
  },
  {
    name: 'China',
    description: 'Chinese art spans dynasties from the Shang (1600 BCE) to Qing (1900s), including jade carvings, porcelain, ink landscapes, and calligraphy. Key traditions include Confucian, Taoist, and Buddhist influences.'
  },
  {
    name: 'Mesopotamia',
    description: 'From about 3500–500 BCE, Mesopotamian art includes relief carvings, clay tablets with cuneiform, votive statues, and cylinder seals. Civilizations like the Sumerians, Akkadians, and Assyrians focused on rulers and gods.'
  },
  {
    name: 'Norse Mythology',
    description: 'Rooted in Viking Age Scandinavia (c. 800–1100 CE), Norse art features runestones, weapons, animal interlace designs, and carvings of gods like Odin and Thor. Art is often found on ships, jewelry, and wood panels.'
  },
  {
    name: 'Byzantine',
    description: 'From the 4th to 15th centuries CE, Byzantine art is known for its gold-ground mosaics, religious icons, and elaborate church decoration. It blends Roman, Greek, and Eastern Christian styles, centered around Constantinople.'
  },
  {
    name: 'Aztec',
    description: 'From the 14th to early 16th century in central Mexico, Aztec art includes stone sculptures, ceremonial masks, codices, and featherwork. Themes often involve gods, war, and human sacrifice, with symbolic visual language.'
  },
  {
    name: 'Inuit',
    description: 'Inuit art from Arctic regions includes ivory carvings, masks, clothing, and tools, often made from whale bone or seal skin. Rooted in survival and spirituality, much of the art reflects animals, hunting, and myth.'
  },
  {
    name: 'Medieval Europe',
    description: 'Spanning 500–1400 CE, this period includes illuminated manuscripts, religious sculpture, Gothic cathedrals, and tapestries. Art was largely religious, commissioned by the Church or royalty, and symbolically rich.'
  },
  {
    name: 'Aboriginal Australia',
    description: 'Art by Indigenous Australians, dating back 40,000+ years, includes rock paintings, bark art, and dot paintings. It’s deeply connected to the Dreamtime, with symbolic storytelling and maps of the land.'
  },
  {
    name: 'Baroque',
    description: 'A 17th-century European style known for dramatic lighting, realism, and grandeur. Artists like Caravaggio and Rubens depicted religious and mythological scenes with strong emotion and movement.'
  },
  {
    name: 'Mayan',
    description: 'Mayan art, from 250–900 CE in Mesoamerica, includes stone reliefs, painted ceramics, stelae, and glyph-covered codices. Common themes are kingship, gods, rituals, and the calendar.'
  },
  {
    name: 'Rococo',
    description: 'An 18th-century decorative style from France, associated with pastel colors, ornate details, and playful, romantic scenes. Artists like Fragonard and Boucher created intimate, aristocratic imagery.'
  },
  {
    name: 'Native American',
    description: 'Spanning North America’s diverse Indigenous cultures, this includes beadwork, pottery, textiles, totem poles, and ceremonial regalia. Traditions vary widely across regions and time periods.'
  },
  {
    name: 'Mughal India',
    description: 'From the 16th to 19th centuries, Mughal art includes miniature paintings, jewel-encrusted weapons, calligraphy, and architecture like the Taj Mahal. It blends Persian, Indian, and Islamic styles.'
  },
  {
    name: 'Gothic',
    description: 'From the 12th–15th centuries in Europe, Gothic art features stained glass, illuminated manuscripts, and pointed-arch architecture. Common themes include biblical scenes, saints, and the afterlife.'
  },
  {
    name: 'Persian Empire',
    description: 'From the Achaemenid to Safavid dynasties (c. 550 BCE–1700s), Persian art includes metalwork, illuminated manuscripts, carpets, and intricate tilework. Poetry, astronomy, and court life often appear as subjects.'
  },
  {
    name: 'Art Nouveau',
    description: 'Active around 1890–1910, this decorative style featured flowing lines, nature-inspired forms, and new materials. Artists include Alphonse Mucha and architects like Victor Horta and Antoni Gaudí.'
  },
  {
    name: 'Caribbean',
    description: 'Caribbean art reflects African, Indigenous, and European influences. It includes folk sculpture, carnival costumes, paintings, and crafts, often expressing themes of colonialism, identity, and celebration.'
  },
  {
    name: 'Industrial Revolution',
    description: 'From the late 18th to 19th century, art and design responded to rapid mechanization. It includes prints, factory scenes, labor-focused realism, and industrial design objects from Britain and Europe.'
  },
  {
    name: 'Celtic',
    description: 'From around 800 BCE to the early medieval period, Celtic art includes intricate metalwork, illuminated manuscripts like the Book of Kells, and knotwork motifs in stone carvings and jewelry.'
  },
  {
    name: 'Colonial America',
    description: 'From the 1600s to the late 1700s, American colonial art includes portraiture, folk art, furniture, and needlework. Influenced by European styles, it reflects settler life, religion, and politics.'
  },
  {
    name: 'Edo Japan',
    description: 'From 1603 to 1868, the Edo period produced woodblock prints (ukiyo-e), calligraphy, ceramics, and kabuki theater art. Artists like Hokusai and Hiroshige captured everyday life and landscapes.'
  },
  {
    name: 'Baseball',
    description: 'Baseball-themed art includes vintage posters, trading cards, stadium prints, and memorabilia from the 19th century onward. It reflects the sport’s cultural significance in American history.'
  },
  {
    name: 'Football',
    description: 'Football art spans match posters, fan memorabilia, photography, and paintings from the 20th century on. It often highlights team identity, movement, and community culture.'
  },
  {
    name: 'Horses',
    description: 'Horse-related art spans cultures and eras, including equestrian portraits, cavalry scenes, and sculptures. It appears in royal art, sporting imagery, and mythology.'
  },
  {
    name: 'Animals',
    description: 'Animal art ranges from prehistoric cave paintings to scientific illustrations and modern wildlife sculpture. It can reflect observation, symbolism, or human-animal relationships.'
  }

];

export default themesArray;


    // 'Neolithic',
    // 'Impressionism',
    // 'Africa',
    // 'Samurai',
    // 'Silk Road',
    // 'Ancient Egypt',
    // 'China',
    // 'Mesopotamia',
    // 'Norse Mythology',
    // 'Byzantine',
    // 'Aztec',
    // 'Inuit',
    // 'Medieval Europe',
    // 'Aboriginal Australia',
    // 'Baroque',
    // 'Mayan',
    // 'Rococo',
    // 'Native American',
    // 'Mughal India',
    // 'Gothic',
    // 'Persian Empire',
    // 'Art Nouveau',
    // 'Caribbean',
    // 'Industrial Revolution',
    // 'Celtic',
    // 'Colonial America',
    // 'Edo Japan',
    // 'Baseball',
    // 'Football',
    // 'Horses',
    // 'Animals',