import {type FormEvent, useState} from 'react';
import ContentHero from '../components/content/ContentHero.tsx';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';

const Contact = () => {
    usePageMetadata('Contact us', 'Contact The Heathens Store for product, delivery, order and return support.');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const submit = (event: FormEvent) => {
        event.preventDefault();
        const subject = encodeURIComponent(`Store enquiry from ${name}`);
        const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:support@theheathensstore.com?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <ContentHero eyebrow="CUSTOMER SUPPORT" title="How can we help?" description="Tell us what you need and our support team will point you in the right direction."/>
            <section className="container content-section">
                <div className="row">
                    <div className="col-lg-5 p-b-30">
                        <div className="content-card">
                            <h2>Contact details</h2>
                            <p><strong>Email</strong><br/><a href="mailto:support@theheathensstore.com">support@theheathensstore.com</a></p>
                            <p><strong>Phone</strong><br/><a href="tel:+441612345678">+44 161 234 5678</a></p>
                            <p><strong>Support hours</strong><br/>Monday–Friday, 09:00–17:00<br/>Asia/Bangkok time</p>
                            <p><strong>Order enquiries</strong><br/>Include the first eight characters of your order code so we can help faster.</p>
                        </div>
                    </div>
                    <div className="col-lg-7 p-b-30">
                        <form className="content-card" onSubmit={submit}>
                            <h2>Send an enquiry</h2>
                            <label htmlFor="contact-name">Name</label><input id="contact-name" className="form-control m-b-18" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100}/>
                            <label htmlFor="contact-email">Email</label><input id="contact-email" className="form-control m-b-18" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={255}/>
                            <label htmlFor="contact-message">Message</label><textarea id="contact-message" className="form-control m-b-20" rows={7} value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={2000}/>
                            <button className="btn btn-dark">Continue in email</button>
                            <p className="content-form-note">Submitting opens your email application. The website does not store this message.</p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
