import ContentHero from '../components/content/ContentHero.tsx';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';

const questions = [
    ['How can I find a product?', 'Use the search icon or open Shop to filter by club, league, season, kit type and price. Search is case-insensitive and also checks the product description.'],
    ['How do I track my order?', 'Open My Account and expand the order in Order history. The current order and payment statuses appear next to the order code.'],
    ['Can I cancel an order?', 'You can cancel an order while its status is PENDING or CONFIRMED. Once processing or shipping has started, contact support for help.'],
    ['Which payment method is available?', 'Checkout currently supports cash on delivery (COD). No card information is collected or stored.'],
    ['How much is shipping?', 'Standard delivery costs $5 and is free when the merchandise subtotal reaches $100. Express delivery costs $15.'],
    ['Can I save more than one address?', 'Yes. My Account lets you save multiple delivery addresses. Your default address is selected first during checkout.'],
    ['What if an item is out of stock?', 'The cart and checkout validate current stock. If stock changed after you added an item, update the quantity or remove that item before ordering.'],
    ['How should I wash a printed football shirt?', 'Wash it inside out in cold water on a gentle cycle, avoid bleach and tumble drying, and never iron directly over badges or printed names.'],
];

const Faq = () => {
    usePageMetadata('Frequently asked questions', 'Answers about shopping, delivery, COD payments, order tracking, cancellation and football shirt care.');
    return <><ContentHero eyebrow="HELP CENTRE" title="Frequently asked questions" description="Quick answers about products, orders, delivery and account management."/><section className="container content-section"><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<i className="zmdi zmdi-chevron-down"/></summary><p>{answer}</p></details>)}</div></section></>;
};

export default Faq;
