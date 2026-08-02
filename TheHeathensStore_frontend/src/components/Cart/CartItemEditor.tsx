import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import type {CartItem} from '../../types/cart.ts';
import {NO_IMAGE_AVAILABLE_URL} from '../../util/constants.ts';

export type PendingCartAction = 'NONE' | 'UPDATE_QUANTITY' | 'REMOVE_ITEM';

type CartItemEditorProps = {
    item: CartItem;
    isPending: boolean;
    onUpdateQuantity: (productUuid: string, quantity: number) => Promise<void>;
    onRemove: (productUuid: string) => Promise<void>;
};

const formatPrice = (price: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(price);

const parseQuantity = (value: string): number | null => {
    if (!/^\d+$/.test(value)) {
        return null;
    }

    const quantity = Number(value);
    return Number.isSafeInteger(quantity) ? quantity : null;
};

const validateQuantity = (value: string, stock: number): string => {
    if (value.trim() === '') {
        return 'Quantity is required.';
    }

    const quantity = parseQuantity(value);
    if (quantity === null) {
        return 'Enter a whole number only.';
    }
    if (quantity < 1) {
        return 'Quantity must be at least 1.';
    }
    if (quantity > stock) {
        return stock > 0
            ? `Only ${stock} item${stock === 1 ? '' : 's'} available.`
            : 'This product is currently out of stock.';
    }

    return '';
};

const CartItemEditor = ({item, isPending, onUpdateQuantity, onRemove}: CartItemEditorProps) => {
    const originalQuantity = item.quantity;
    const [draftQuantity, setDraftQuantity] = useState(String(originalQuantity));
    const [pendingAction, setPendingAction] = useState<PendingCartAction>('NONE');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const quantityError = useMemo(
        () => validateQuantity(draftQuantity, item.productInfo.stock),
        [draftQuantity, item.productInfo.stock],
    );
    const parsedDraftQuantity = parseQuantity(draftQuantity);
    const isEditing = pendingAction !== 'NONE';
    const isBusy = isLoading || isPending;
    const isRemoving = pendingAction === 'REMOVE_ITEM';
    const isQuantityEditing = pendingAction === 'UPDATE_QUANTITY';
    const displayedSubtotal = isQuantityEditing && !quantityError && parsedDraftQuantity !== null
        ? item.productInfo.price * parsedDraftQuantity
        : item.subTotal;

    const updateDraft = (value: string) => {
        setDraftQuantity(value);
        setPendingAction(value === String(originalQuantity) ? 'NONE' : 'UPDATE_QUANTITY');
        setError(value === String(originalQuantity) ? '' : validateQuantity(value, item.productInfo.stock));
    };

    const adjustQuantity = (offset: number) => {
        const currentQuantity = parseQuantity(draftQuantity) ?? originalQuantity;
        const maximumQuantity = Math.max(1, item.productInfo.stock);
        const nextQuantity = Math.min(maximumQuantity, Math.max(1, currentQuantity + offset));
        updateDraft(String(nextQuantity));
    };

    const requestRemoval = () => {
        setDraftQuantity(String(originalQuantity));
        setPendingAction('REMOVE_ITEM');
        setError('');
    };

    const cancelEditing = () => {
        setDraftQuantity(String(originalQuantity));
        setPendingAction('NONE');
        setError('');
    };

    const confirmUpdate = async () => {
        if (pendingAction === 'NONE' || isBusy) {
            return;
        }

        if (pendingAction === 'UPDATE_QUANTITY' && (quantityError || parsedDraftQuantity === null)) {
            setError(quantityError || 'Enter a valid quantity.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            if (pendingAction === 'REMOVE_ITEM') {
                await onRemove(item.productInfo.uuid);
            } else if (parsedDraftQuantity !== null) {
                await onUpdateQuantity(item.productInfo.uuid, parsedDraftQuantity);
                setDraftQuantity(String(parsedDraftQuantity));
                setPendingAction('NONE');
            }
        } catch (actionError) {
            setError(actionError instanceof Error ? actionError.message : 'Unable to update this cart item. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <article className={`cart-item-card${isRemoving ? ' is-removing' : ''}`} aria-busy={isBusy}>
            <Link className="cart-item-image" to={`/product-detail/${item.productInfo.uuid}`} tabIndex={isBusy ? -1 : undefined}>
                <img src={item.productInfo.thumbnailUrl || NO_IMAGE_AVAILABLE_URL} alt={item.productInfo.name}/>
            </Link>

            <div className="cart-item-body">
                <header className="cart-item-header">
                    <div>
                        <Link className="cart-item-name" to={`/product-detail/${item.productInfo.uuid}`}>
                            {item.productInfo.name}
                        </Link>
                        <p>{item.productInfo.teamName} <span aria-hidden="true">·</span> {item.productInfo.season}</p>
                        <span className="cart-item-stock">{item.productInfo.stock} in stock</span>
                    </div>
                    <button
                        type="button"
                        className="cart-item-remove"
                        onClick={requestRemoval}
                        disabled={isBusy || isRemoving}
                        aria-label={`Remove ${item.productInfo.name}`}
                    >
                        <i className="zmdi zmdi-delete" aria-hidden="true"/>
                        <span>Remove</span>
                    </button>
                </header>

                <div className="cart-item-values">
                    <div className="cart-item-value">
                        <span className="cart-item-label">Price</span>
                        <strong>{formatPrice(item.productInfo.price)}</strong>
                    </div>

                    <div className="cart-item-value cart-item-quantity-value">
                        <label className="cart-item-label" htmlFor={`quantity-${item.id}`}>Quantity</label>
                        <div className="cart-quantity-control">
                            <button
                                type="button"
                                onClick={() => adjustQuantity(-1)}
                                disabled={isBusy || isRemoving || (parsedDraftQuantity ?? originalQuantity) <= 1}
                                aria-label={`Decrease quantity of ${item.productInfo.name}`}
                            >
                                <i className="zmdi zmdi-minus" aria-hidden="true"/>
                            </button>
                            <input
                                id={`quantity-${item.id}`}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={draftQuantity}
                                disabled={isBusy || isRemoving}
                                aria-invalid={Boolean(isQuantityEditing && quantityError)}
                                aria-describedby={`quantity-help-${item.id}`}
                                onChange={(event) => updateDraft(event.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => adjustQuantity(1)}
                                disabled={isBusy || isRemoving || (parsedDraftQuantity ?? originalQuantity) >= item.productInfo.stock}
                                aria-label={`Increase quantity of ${item.productInfo.name}`}
                            >
                                <i className="zmdi zmdi-plus" aria-hidden="true"/>
                            </button>
                        </div>
                        <span id={`quantity-help-${item.id}`} className="cart-item-field-help">
                            Maximum {item.productInfo.stock}
                        </span>
                    </div>

                    <div className="cart-item-value cart-item-subtotal">
                        <span className="cart-item-label">Subtotal</span>
                        <strong>{formatPrice(displayedSubtotal)}</strong>
                        {isQuantityEditing && !quantityError && <span className="cart-item-draft-note">Preview</span>}
                    </div>
                </div>

                {isRemoving && (
                    <div className="cart-item-confirmation" role="status">
                        <i className="zmdi zmdi-alert-circle" aria-hidden="true"/>
                        <span>This item will be removed after you select Update.</span>
                    </div>
                )}

                {(error || (isQuantityEditing && quantityError)) && (
                    <p className="cart-item-error" role="alert">{error || quantityError}</p>
                )}

                {isEditing && (
                    <div className="cart-item-actions">
                        <button
                            type="button"
                            className="cart-item-update"
                            onClick={() => void confirmUpdate()}
                            disabled={isBusy || (isQuantityEditing && Boolean(quantityError))}
                        >
                            {isBusy && <span className="cart-action-spinner" aria-hidden="true"/>}
                            {isBusy ? (isRemoving ? 'Removing...' : 'Updating...') : 'Update'}
                        </button>
                        <button type="button" className="cart-item-cancel" onClick={cancelEditing} disabled={isBusy}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
};

export default CartItemEditor;
