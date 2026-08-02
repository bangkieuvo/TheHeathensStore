import {Link} from 'react-router-dom';
import {usePageMetadata} from '../hooks/usePageMetadata.ts';

const NotFound = () => {
    usePageMetadata('Page not found', 'The requested page could not be found.');
    return <div className="container commerce-empty-state"><span className="not-found-code">404</span><h1>Page not found</h1><p className="p-tb-20">The page may have moved or the address is incorrect.</p><Link className="btn btn-dark" to="/">Return home</Link></div>;
};

export default NotFound;
