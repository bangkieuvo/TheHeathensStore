import blog01 from '../assets/images/blog-01.jpg';
import blog02 from '../assets/images/blog-02.jpg';
import blog03 from '../assets/images/blog-03.jpg';
import blog04 from '../assets/images/blog-04.jpg';
import blog05 from '../assets/images/blog-05.jpg';
import blog06 from '../assets/images/blog-06.jpg';

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: 'Jersey Guide' | 'Football Culture' | 'Care Guide';
    publishedAt: string;
    author: string;
    readingTime: number;
    image: string;
    imageAlt: string;
    content: {heading?: string; paragraphs: string[]}[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'how-to-choose-the-right-football-jersey',
        title: 'How to choose the right football jersey',
        excerpt: 'A practical guide to fit, fabric, season and shirt type before you add a new jersey to your collection.',
        category: 'Jersey Guide', publishedAt: '2026-07-24', author: 'The Heathens Editorial', readingTime: 6,
        image: blog01, imageAlt: 'Football jersey selection guide',
        content: [
            {paragraphs: ['The right football jersey should feel comfortable, represent the story you care about and suit the way you plan to wear it. Start by deciding whether the shirt is for match day, casual use or a long-term collection.']},
            {heading: 'Choose the fit first', paragraphs: ['Check the product measurements rather than relying only on the size printed on the label. A relaxed fit works well over a base layer, while a closer fit is usually better for training.']},
            {heading: 'Think about the season and shirt type', paragraphs: ['Home shirts carry the strongest club identity. Away and third kits often use more experimental colours, while goalkeeper editions are ideal for collectors looking for something less common.']},
        ],
    },
    {
        slug: 'home-away-third-kits-explained',
        title: 'Home, away and third kits explained',
        excerpt: 'Why football clubs release several kits each season and what makes every version different.',
        category: 'Football Culture', publishedAt: '2026-07-18', author: 'The Heathens Editorial', readingTime: 5,
        image: blog02, imageAlt: 'Home and away football shirts',
        content: [
            {paragraphs: ['A club’s home kit is its visual signature. The colours and pattern normally stay close to tradition, even when details change from one season to the next.']},
            {heading: 'Why away kits exist', paragraphs: ['Away kits prevent colour clashes and give designers space to reinterpret a club’s identity. Third kits provide another option for European fixtures and difficult match-ups.']},
            {heading: 'Which one should you collect?', paragraphs: ['Choose the shirt connected to a match, player or period you remember. A meaningful shirt will remain part of your collection long after a seasonal trend has passed.']},
        ],
    },
    {
        slug: 'care-for-your-football-shirts',
        title: 'How to wash and care for football shirts',
        excerpt: 'Simple steps that protect badges, sponsor prints, namesets and colours for longer.',
        category: 'Care Guide', publishedAt: '2026-07-10', author: 'The Heathens Editorial', readingTime: 4,
        image: blog03, imageAlt: 'Football shirt care instructions',
        content: [
            {paragraphs: ['Turn the shirt inside out before washing. Use cold water, a gentle cycle and a mild detergent. This reduces friction on printed details and helps colours remain consistent.']},
            {heading: 'Avoid heat', paragraphs: ['Do not use a tumble dryer or place an iron directly on badges and namesets. Air-dry the shirt away from direct sunlight and store it only when completely dry.']},
            {heading: 'Storage matters', paragraphs: ['Use a wide hanger or fold the shirt loosely. Avoid pressing printed areas against sharp folds, especially during long-term storage.']},
        ],
    },
    {
        slug: 'building-a-football-shirt-collection',
        title: 'Building a football shirt collection with a story',
        excerpt: 'How to create a focused collection around clubs, players, tournaments or unforgettable seasons.',
        category: 'Football Culture', publishedAt: '2026-06-28', author: 'The Heathens Editorial', readingTime: 7,
        image: blog04, imageAlt: 'Collection of football shirts',
        content: [
            {paragraphs: ['A good collection does not need to be the largest. It needs a clear connection to the matches, cities and players that made football important to you.']},
            {heading: 'Set a theme', paragraphs: ['You might collect one club across several seasons, shirts from a particular tournament, or designs associated with a favourite player. A theme makes every addition intentional.']},
            {heading: 'Record the details', paragraphs: ['Keep the season, shirt type and story behind each item. These details make the collection easier to organise and more meaningful to share.']},
        ],
    },
    {
        slug: 'goalkeeper-shirts-design-history',
        title: 'Why goalkeeper shirts look so different',
        excerpt: 'From practical colour separation to some of football’s boldest visual designs.',
        category: 'Football Culture', publishedAt: '2026-06-15', author: 'The Heathens Editorial', readingTime: 5,
        image: blog05, imageAlt: 'Colourful goalkeeper football shirt',
        content: [
            {paragraphs: ['Goalkeepers must be visually distinct from outfield players and match officials. That practical rule helped create a category known for bright colours and expressive patterns.']},
            {heading: 'A collector favourite', paragraphs: ['Goalkeeper shirts are often produced in smaller numbers and linked closely to one player. Those qualities have made them an increasingly important part of football shirt culture.']},
        ],
    },
    {
        slug: 'understanding-football-shirt-seasons',
        title: 'Understanding seasons in football shirt names',
        excerpt: 'What labels such as 2024/2025 mean and how to identify the correct shirt for a particular campaign.',
        category: 'Jersey Guide', publishedAt: '2026-06-02', author: 'The Heathens Editorial', readingTime: 4,
        image: blog06, imageAlt: 'Football season shirt guide',
        content: [
            {paragraphs: ['European club seasons usually span two calendar years, so a 2025/2026 shirt belongs to the campaign that begins in 2025 and finishes in 2026.']},
            {heading: 'Look beyond the year', paragraphs: ['Sponsors, collar shapes, badges and competition patches can help confirm the exact season. Product descriptions should also identify whether a shirt is home, away, third or goalkeeper.']},
        ],
    },
];

export const findBlogPost = (slug?: string) => blogPosts.find((post) => post.slug === slug);
