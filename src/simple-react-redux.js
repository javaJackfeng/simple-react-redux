import React, { useContext, useReducer, useLayoutEffect } from "react";

const Context = React.createContext();

const bindActionCreator = (creator, dispatch) => {
    return (...args) => dispatch(creator(...args));
};

const bindActionCreators = (creators, dispatch) => {
    const obj = {};
    for (let key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch);
    }
    return obj;
};

export const connect =
    (mapStateToProps = (state) => state, mapDispatchToProps) =>
    (WrappedComponent) =>
    (props) => {
        const store = useContext(Context);
        const { subscribe, dispatch, getState } = store || {};
        const stateProps = mapStateToProps(getState());
        let dispatchProps = { dispatch };

        const [, forceUpdate] = useReducer((x) => x + 1, 0);

        if (typeof mapDispatchToProps === "function") {
            dispatchProps = mapDispatchToProps(dispatch);
        } else if (typeof mapDispatchToProps === "object") {
            dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        }

        useLayoutEffect(() => {
            const unsubscribe = subscribe(() => {
                forceUpdate();
            });

            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }, [store, subscribe]);

        return (
            <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
        );
    };

export function Provider(props) {
    const { store, children } = props;
    return <Context.Provider value={store}>{children}</Context.Provider>;
}
