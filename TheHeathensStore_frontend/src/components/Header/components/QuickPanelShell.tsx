import type {ReactNode} from 'react';

type QuickPanelShellProps = {
    isOpen: boolean;
    title: string;
    count: number;
    iconClassName: string;
    onClose: () => void;
    children: ReactNode;
    footer?: ReactNode;
};

const QuickPanelShell = ({isOpen, title, count, iconClassName, onClose, children, footer}: QuickPanelShellProps) => (
    <div className={`header-quick-panel-wrap${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
        <button
            type="button"
            className="header-quick-panel-overlay"
            onClick={onClose}
            aria-label={`Close ${title.toLowerCase()} panel`}
            tabIndex={isOpen ? 0 : -1}
        />
        <aside className="header-quick-panel" role="dialog" aria-modal="true" aria-label={title}>
            <header className="header-quick-panel-heading">
                <div className="header-quick-panel-title">
                    <span className="header-quick-panel-icon"><i className={iconClassName} aria-hidden="true"/></span>
                    <div>
                        <h2>{title}</h2>
                        <span>{count} item{count === 1 ? '' : 's'}</span>
                    </div>
                </div>
                <button type="button" className="header-quick-panel-close" onClick={onClose} aria-label={`Close ${title.toLowerCase()}`}>
                    <i className="zmdi zmdi-close" aria-hidden="true"/>
                </button>
            </header>

            <div className="header-quick-panel-body">{children}</div>
            {footer && <footer className="header-quick-panel-footer">{footer}</footer>}
        </aside>
    </div>
);

export default QuickPanelShell;
