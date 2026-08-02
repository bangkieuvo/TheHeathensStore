import ContentHero from '../components/content/ContentHero.tsx';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';

const ReturnsPolicy = () => {
    usePageMetadata('Returns policy', 'Read The Heathens Store return eligibility, return process, refund and damaged item policy.');
    return <><ContentHero eyebrow="STORE POLICY" title="Returns and exchanges" description="Clear steps for returning an eligible item and resolving product issues."/><article className="container legal-content content-section"><p className="legal-updated">Last updated: 2 August 2026</p><h2>Return window</h2><p>Contact us within 14 calendar days after delivery. Items must be unworn, unwashed and returned with their original tags and packaging.</p><h2>Items that cannot be returned</h2><p>Personalised shirts, printed namesets and products marked as final sale cannot be returned unless they arrive damaged, defective or different from the item ordered.</p><h2>Starting a return</h2><ol><li>Email support with your order code and the items you want to return.</li><li>Wait for return approval and shipping instructions.</li><li>Pack the product securely and retain proof of postage.</li></ol><h2>Refunds</h2><p>After inspection, approved refunds are processed to the agreed method. Original express shipping charges and return postage are not refundable unless the store made an error.</p><h2>Damaged or incorrect products</h2><p>Contact support within 48 hours of delivery with clear photographs of the package, product and labels. We will prioritise a replacement or refund after verification.</p></article></>;
};

export default ReturnsPolicy;
