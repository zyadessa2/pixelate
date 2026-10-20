export type Service = {
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  intro: string
  scope: { title: string; text: string }[]
  brief: string
  faq: { question: string; answer: string }[]
  related: string[]
}

export const services: Service[] = [
  {
    slug: 'audio-visual-lighting', title: 'Audio Visual & Lighting', subtitle: 'AVL Solutions',
    description: 'Audio, video and lighting for events in Dubai. Bring sound, screens and stage lighting together with Pixelate’s integrated AVL production services.',
    image: '/ourServices/avl (1).webp',
    intro: 'An event works best when the audience can hear every word, see the content clearly and follow what is happening on stage. Pixelate brings audio, visual displays and lighting into one production plan for conferences, corporate events and live experiences in Dubai and the UAE.',
    scope: [
      { title: 'A connected technical plan', text: 'The venue layout, audience size and programme shape the setup. We consider microphone requirements, screen positions and lighting together so that each element supports the speakers, performances and brand content.' },
      { title: 'Content and cue coordination', text: 'Presentations, videos and stage moments need a clear running order. Discuss playback formats, presenter transitions and lighting changes early so that the technical requirements can be reviewed before the event.' },
      { title: 'Production built around your venue', text: 'Room dimensions, access times and the venue’s existing equipment affect the production approach. Share these details with our team to define the equipment and support needed for your event.' },
    ],
    brief: 'Send the event date, venue, expected attendance, agenda and any existing technical specification. Include whether the programme features speeches, video playback, performances or a combination of these.',
    faq: [
      { question: 'What does AVL mean?', answer: 'AVL stands for audio, visual and lighting. It covers the systems that help an audience hear the programme, see presentations or video, and experience the stage and event space.' },
      { question: 'Can the sound, screens and lighting be planned together?', answer: 'Yes. Pixelate offers these services as part of an integrated event production brief. The final scope depends on your venue, programme and budget.' },
    ],
    related: ['led-screens', 'sound-systems', 'stage-lighting'],
  },
  {
    slug: 'led-screens', title: 'LED Screens', subtitle: 'Event Display Solutions',
    description: 'LED screen solutions for Dubai events, conferences and exhibitions. Plan stage displays, presentation content and screen layouts with Pixelate.',
    image: '/ourServices/stage-background-led-screen_9.webp',
    intro: 'A screen should make your content easy to understand from the audience’s position. Pixelate plans LED displays for event stages, presentations and exhibition environments in Dubai, connecting the visual design with the practical needs of the space.',
    scope: [
      { title: 'Screen layout and sightlines', text: 'Display size and placement depend on room dimensions, seating and viewing distance. A presentation-led conference needs different screen decisions from a brand reveal or an exhibition display.' },
      { title: 'Content that fits the display', text: 'Screen proportions influence how logos, slides and motion graphics appear. Agreeing the display layout before finalising content helps avoid cropping, unreadable text and last-minute format changes.' },
      { title: 'Part of the stage design', text: 'LED screens work alongside sound, lighting and the stage setting. We consider how these elements fit together so that the display supports the event rather than competing with the presenter.' },
    ],
    brief: 'Share your venue, indoor or outdoor setting, approximate audience distance, screen purpose and sample content. If you already have a screen size or layout in mind, include it in your enquiry.',
    faq: [
      { question: 'How do I choose an LED screen size for my event?', answer: 'Start with the room layout, viewing distance and the type of content being shown. Share those details with Pixelate so the display requirements can be assessed for your event.' },
      { question: 'Should content be prepared before the screen layout is agreed?', answer: 'A draft is useful, but the final content dimensions should match the agreed display layout. Confirming this early reduces rework on slides, video and branded visuals.' },
    ],
    related: ['audio-visual-lighting', 'creative-design', 'event-production'],
  },
  {
    slug: 'sound-systems', title: 'Sound Systems', subtitle: 'Event Audio Solutions',
    description: 'Event sound systems in Dubai for speeches, conferences and live programmes. Discuss microphones, audience coverage and audio production with Pixelate.',
    image: '/ourServices/360_F_898633639_pcBdWh3fDOEogkFEoJB2ryQqLSuFloX1.jpg',
    intro: 'Clear audio keeps an audience connected to your event. Pixelate provides sound solutions for corporate presentations, conferences and live programmes, with the setup informed by the venue, audience and the people taking part.',
    scope: [
      { title: 'Speech and presentation audio', text: 'A keynote, panel discussion and moving presenter each bring different microphone requirements. Identifying the number of speakers and how they will use the stage helps define the audio plan.' },
      { title: 'Coverage for the audience', text: 'Speaker placement should reflect where guests will sit or stand. Venue acoustics, room shape and nearby activity are important considerations when planning intelligible sound.' },
      { title: 'Music and programme requirements', text: 'Playback, performances and presentations may need different inputs and transitions. A shared agenda and any performer requirements help connect the sound plan to the event running order.' },
    ],
    brief: 'Include the venue, attendance, seating arrangement, number of speakers and any live performance requirements. Let us know if your event includes video playback or remote contributors.',
    faq: [
      { question: 'What information helps plan microphones for a conference?', answer: 'The number of simultaneous speakers, panel format, presenter movement and any audience questions all affect microphone requirements.' },
      { question: 'Does the venue affect the sound system?', answer: 'Yes. Room dimensions, acoustics and the audience layout influence the audio setup. Existing venue equipment should also be reviewed when defining the scope.' },
    ],
    related: ['audio-visual-lighting', 'corporate-events', 'stage-lighting'],
  },
  {
    slug: 'stage-lighting', title: 'Stage Lighting', subtitle: 'Event Lighting Design',
    description: 'Stage and event lighting in Dubai. Shape the atmosphere, support presenters and coordinate lighting with your event production through Pixelate.',
    image: '/ourServices/pngtree-concert-light-show-stage-lights-picture-image_15533230.jpg',
    intro: 'Lighting helps guests know where to look and sets the mood of an event. Pixelate develops lighting approaches for stages and event spaces in Dubai, balancing atmosphere with the visibility needed for speakers, content and live moments.',
    scope: [
      { title: 'Visibility on stage', text: 'Presenters and performers need to be visible without distracting from screen content. Stage dimensions, movement and any filming requirements guide the lighting brief.' },
      { title: 'A visual mood for your event', text: 'Colour and contrast can connect a space to your brand or event concept. A corporate conference, celebration and product reveal each call for a different visual approach.' },
      { title: 'Lighting changes with the programme', text: 'Entrances, presentations and key announcements benefit from planned transitions. Linking lighting cues to the running order helps the technical plan support the experience.' },
    ],
    brief: 'Send the venue, stage dimensions, event concept, brand colours and programme. Include any reference images, filming plans and venue restrictions that could affect the setup.',
    faq: [
      { question: 'Can lighting be coordinated with LED screen content?', answer: 'Yes. Planning the lighting and visual display together helps manage contrast, colour and the overall appearance of the stage.' },
      { question: 'What should I include in a lighting brief?', answer: 'Useful details include the stage layout, event schedule, brand references, presenter movements and whether the event will be photographed or filmed.' },
    ],
    related: ['audio-visual-lighting', 'led-screens', 'event-production'],
  },
  {
    slug: 'corporate-events', title: 'Corporate Events', subtitle: 'Conferences & Business Gatherings',
    description: 'Corporate event planning and production in Dubai. Pixelate helps shape conferences, business gatherings and branded events around your objectives.',
    image: '/ourServices/event-management-july.webp',
    intro: 'A business event needs a clear purpose as well as a considered guest experience. Pixelate supports corporate events and conferences in Dubai, bringing planning, creative direction and technical production into the same conversation.',
    scope: [
      { title: 'Start with the business objective', text: 'An internal gathering, partner event and customer-facing launch serve different audiences. We begin with what attendees should learn, feel or do, then connect the event format to that purpose.' },
      { title: 'Plan the flow of the programme', text: 'Arrival, presentations, breaks and key announcements need to work as a complete experience. The agenda helps define the stage layout, screen content and audio requirements.' },
      { title: 'Keep the brand consistent', text: 'Event graphics, presentations and environmental design should feel connected. Combining creative work with production planning helps keep the visual identity consistent across the event.' },
    ],
    brief: 'Tell us your event objective, audience, proposed date, venue status and approximate attendance. Share an agenda or outline and identify the moments that matter most to your organisation.',
    faq: [
      { question: 'Can Pixelate support both planning and technical production?', answer: 'Pixelate offers event management, creative design and AVL production services. These can be discussed together to define the right scope for your corporate event.' },
      { question: 'Do I need a completed agenda before getting in touch?', answer: 'No. An outline of your objectives, audience and preferred format is enough to begin discussing the event. A detailed agenda can then guide production planning.' },
    ],
    related: ['event-management', 'audio-visual-lighting', 'creative-design'],
  },
  {
    slug: 'event-management', title: 'Event Management', subtitle: 'From Concept to Delivery',
    description: 'Event management in Dubai from concept to execution. Coordinate your event brief, creative requirements and production planning with Pixelate.',
    image: '/ourServices/event-management-july.webp',
    intro: 'Event management connects the decisions that make an event possible. Pixelate helps turn a brief into a coordinated plan, aligning the concept, schedule and production requirements for events in Dubai and the UAE.',
    scope: [
      { title: 'Define the scope early', text: 'The audience, venue, budget and event goals set the boundaries of the plan. Establishing priorities early helps the team focus on the elements that matter most to the experience.' },
      { title: 'Connect creative and technical work', text: 'A stage concept has implications for screens, sound, lighting and content. Considering these together helps identify dependencies before production decisions are finalised.' },
      { title: 'Build around the running order', text: 'A working schedule links preparation, setup and the live programme. Clear responsibilities and agreed milestones help keep the different parts of the event aligned.' },
    ],
    brief: 'Share the event type, date, venue status, guest numbers and budget range. Note what is already arranged and where you need support so that the management scope can be defined clearly.',
    faq: [
      { question: 'How is event management different from production?', answer: 'Management coordinates the overall plan, schedule and requirements. Production focuses on turning the creative and technical plan into the event environment. The two need to work closely together.' },
      { question: 'Can I enquire if some parts of the event are already arranged?', answer: 'Yes. Tell us what is confirmed, which suppliers or venue services are involved and the areas where you need support. The scope can be discussed around those existing arrangements.' },
    ],
    related: ['event-production', 'corporate-events', 'exhibition-design'],
  },
  {
    slug: 'event-production', title: 'Event Production', subtitle: 'Creative & Technical Delivery',
    description: 'Event production in Dubai combining creative concepts, stage visuals, audio and lighting. Discuss your next event production with Pixelate.',
    image: '/ourServices/istockphoto-1480245214-612x612.jpg',
    intro: 'Event production turns a creative idea into a space that an audience can experience. Pixelate connects design and technical requirements for event environments in Dubai, considering how the stage, visuals, sound and lighting will work together.',
    scope: [
      { title: 'Translate the concept into requirements', text: 'A visual reference is a starting point. Venue dimensions, access arrangements and the programme help determine how the concept can be developed into a practical production plan.' },
      { title: 'Coordinate the event environment', text: 'Screens, lighting, audio and branded visuals each play a role in the finished experience. Planning them together helps avoid disconnected decisions about the stage and audience space.' },
      { title: 'Prepare for the key moments', text: 'Reveals, speeches and transitions rely on several elements happening in sequence. Reviewing the running order and content requirements helps clarify what each moment needs.' },
    ],
    brief: 'Send your event concept, venue information, programme and visual references. Include any existing designs and the proposed setup and event dates so we can discuss the production requirements.',
    faq: [
      { question: 'Can Pixelate work from an existing event concept?', answer: 'Yes. Share the concept, references and any existing drawings. The team can discuss the creative and technical services needed to develop the production scope.' },
      { question: 'When should technical planning begin?', answer: 'It is useful to consider production while the concept and venue are being chosen. Space, access and technical requirements can influence design decisions before they are finalised.' },
    ],
    related: ['audio-visual-lighting', '3d-visualization', 'event-management'],
  },
  {
    slug: 'exhibition-design', title: 'Exhibition Design', subtitle: 'Trade Shows & Brand Spaces',
    description: 'Exhibition and booth design in Dubai for trade shows, expos and product launches. Develop your branded exhibition space with Pixelate.',
    image: '/ourServices/360_F_600566798_ktW6oDRY7hFlJJapGJAPPseAPo9CXTQY.jpg',
    intro: 'An exhibition space needs to attract attention and support useful conversations. Pixelate develops booth and exhibition concepts for trade shows and expos in Dubai, bringing brand presentation, visitor flow and display requirements into the design.',
    scope: [
      { title: 'Design around your exhibition goals', text: 'Product demonstrations, meetings and brand awareness require different layouts. Understanding your priorities helps define the balance between displays, visitor interaction and conversation areas.' },
      { title: 'Work within the stand requirements', text: 'Stand dimensions, open sides and organiser guidelines shape the concept. Reviewing these details early helps connect the design with the available space and event requirements.' },
      { title: 'Visualise the visitor experience', text: 'Brand graphics, digital displays and 3D concepts help explain how the space will look and function. These elements can be reviewed together before the design is finalised.' },
    ],
    brief: 'Share the exhibition name, stand dimensions, floor plan and organiser guidelines. Include your brand assets, products to display and the main actions you want visitors to take.',
    faq: [
      { question: 'What should I send for an exhibition booth design enquiry?', answer: 'A floor plan, stand size, organiser manual, brand guidelines and a summary of your objectives are the most useful starting points.' },
      { question: 'Can I see the proposed space as a 3D concept?', answer: 'Pixelate offers 3D visualization services. Include this requirement in your exhibition brief so that the views and level of detail can be agreed.' },
    ],
    related: ['3d-visualization', 'creative-design', 'led-screens'],
  },
  {
    slug: 'creative-design', title: 'Creative Design', subtitle: 'Brand Graphics & Visual Communication',
    description: 'Creative design in Dubai for event graphics, brand visuals and visual communication. Build a consistent event identity with Pixelate.',
    image: '/ourServices/blue-and-purple-paint-swirl-abstract-17-09-2024-1726572434.jpg',
    intro: 'A clear visual identity helps an audience recognise your brand throughout an event. Pixelate creates design concepts and graphics that connect the message, the setting and the content across event and digital touchpoints.',
    scope: [
      { title: 'A visual direction with a purpose', text: 'Brand guidelines, audience and the event theme provide the starting point. The design direction should support the message rather than adding decoration without a clear role.' },
      { title: 'Graphics across event formats', text: 'Screen content, presentation layouts and environmental graphics need different dimensions and levels of detail. Planning the required formats helps maintain a consistent appearance across the event.' },
      { title: 'Design that works in its setting', text: 'A graphic viewed from the back of a room has different readability needs from a close-up digital screen. Final sizes, viewing distances and production requirements should inform the artwork.' },
    ],
    brief: 'Send your logo files, brand guidelines, event message and examples of the style you have in mind. List the required assets, dimensions where known and the date each item is needed.',
    faq: [
      { question: 'Can the design follow our existing brand guidelines?', answer: 'Yes. Share the current guidelines and source assets at the start so that the proposed visual direction can reflect your established brand.' },
      { question: 'Which file dimensions should we provide?', answer: 'Provide the final screen or production dimensions when available. If they are not yet confirmed, identify the intended use of each asset so that formats can be coordinated.' },
    ],
    related: ['led-screens', 'exhibition-design', 'website-design'],
  },
  {
    slug: '3d-visualization', title: '3D Concepts & Visualization', subtitle: 'Event Spaces Before Production',
    description: '3D event concepts and visualization in Dubai. Preview stage designs, exhibition spaces and branded environments with Pixelate.',
    image: '/ourServices/1.webp',
    intro: 'A 3D concept makes an event idea easier to discuss before production begins. Pixelate develops visualizations for stages, exhibitions and branded spaces, helping teams review the layout, appearance and relationship between the main design elements.',
    scope: [
      { title: 'Explore the layout', text: 'A three-dimensional view helps explain how the stage, screens and audience or visitor areas fit together. It provides a common reference for creative and production discussions.' },
      { title: 'Review the visual direction', text: 'Materials, colour, branding and display positions shape the feel of a space. Visualizations allow stakeholders to compare the proposed appearance with the brief before committing to the final direction.' },
      { title: 'Clarify what the concept represents', text: 'The level of detail and selected viewpoints should match the decision being made. Concept renders communicate design intent; technical dimensions and production requirements still need separate confirmation.' },
    ],
    brief: 'Provide a venue or stand plan, dimensions, reference images and brand assets. Tell us which areas need to be shown and who will use the visuals to review or approve the concept.',
    faq: [
      { question: 'What is needed to start a 3D event concept?', answer: 'Venue dimensions or a floor plan, a description of the event, brand references and the main elements to include provide a useful foundation.' },
      { question: 'Is a concept render the same as a technical drawing?', answer: 'No. A render shows the intended appearance of a space. Technical drawings and venue checks address dimensions and practical production details and should be agreed separately within the scope.' },
    ],
    related: ['exhibition-design', 'event-production', 'creative-design'],
  },
  {
    slug: 'website-design', title: 'Website Design & Development', subtitle: 'Responsive Digital Experiences',
    description: 'Website design and development in Dubai. Pixelate creates responsive websites shaped around your brand, content and customer journey.',
    image: '/ourServices/dev.jpeg',
    intro: 'Your website should make it easy for visitors to understand what you offer and take the next step. Pixelate provides website design and development, connecting brand presentation with clear page structure and responsive layouts.',
    scope: [
      { title: 'Plan the visitor journey', text: 'A service enquiry, portfolio visit and product introduction each need a clear path. Defining the audience and main actions helps determine the pages, navigation and content priorities.' },
      { title: 'Design for different screens', text: 'Text, imagery and calls to action need to work on phones as well as larger displays. Responsive layouts should preserve the meaning and hierarchy of the content across screen sizes.' },
      { title: 'Connect content and development', text: 'Page structure, forms and content management requirements affect implementation. Agreeing these requirements alongside the visual design helps define a practical scope for the website.' },
    ],
    brief: 'Share your current website if you have one, your audience, brand assets and the main purpose of the new site. List required pages, forms, content editing needs and any integrations to discuss.',
    faq: [
      { question: 'Can I discuss a redesign of an existing website?', answer: 'Yes. Send the current URL and explain what needs to improve, such as page structure, mobile usability, content presentation or the enquiry journey.' },
      { question: 'What should be ready before website design begins?', answer: 'A clear business objective, an outline of the pages, brand assets and available content make a useful starting brief. Missing content and functional requirements can be identified during planning.' },
    ],
    related: ['creative-design', 'application-design'],
  },
  {
    slug: 'application-design', title: 'Application Design & Development', subtitle: 'Mobile & Desktop Experiences',
    description: 'Application design and development in Dubai. Discuss mobile and desktop app journeys, interface design and functionality with Pixelate.',
    image: '/ourServices/dev.jpeg',
    intro: 'An application should help people complete a task with confidence. Pixelate offers application design and development, with a focus on clear user journeys and interfaces for mobile and desktop experiences.',
    scope: [
      { title: 'Define the task and the user', text: 'An application brief begins with who will use it and what they need to achieve. Prioritising the essential actions helps establish the core experience before additional features are considered.' },
      { title: 'Map screens and interactions', text: 'Navigation, forms, feedback and error states all influence how easily a person can use an app. A connected screen flow makes these interactions easier to review before development.' },
      { title: 'Agree the functional scope', text: 'Accounts, data, integrations and platform requirements influence the build. These should be discussed alongside the interface so that the design reflects the intended functionality.' },
    ],
    brief: 'Describe the problem the app should solve, its intended users and preferred platforms. Include the essential features, any existing systems it needs to connect to and reference products if useful.',
    faq: [
      { question: 'Can I start with an app idea rather than a full specification?', answer: 'Yes. Describe the intended users, the problem and the main tasks. This provides a starting point for discussing the user journey and functional requirements.' },
      { question: 'How do we decide which features belong in the first version?', answer: 'Start with the features needed to complete the main user task. Additional requirements can then be reviewed against the project objectives, dependencies and available budget.' },
    ],
    related: ['website-design', 'creative-design'],
  },
]

export const getService = (slug: string) => services.find(service => service.slug === slug)
