// src/alt/single_spa_parcel.ts

/**
 * Encapsulates the logic for mounting, updating, and unmounting a manual Parcel 
 * for demonstration within the SingleSpaReactWrapper.
 * @param {HTMLElement} domElement The container element to mount the parcel into.
 * @param {Object} singleSpa The single-spa instance (from window.singleSpa or context).
 */
export function mountManualParcelDemo(domElement, singleSpa) {
    if (!domElement || !singleSpa || !singleSpa.mountRootParcel) {
        console.error("Cannot start Parcel demo: Missing DOM element or single-spa instance.");
        return;
    }

    // The parcel implementation config (Your Snippet)
    const parcelConfig = {
        // optional
        bootstrap(props) {
            console.log(`[Parcel] Bootstrapping: ${props.customProp1}`);
            return Promise.resolve();
        },
        // required
        mount(props) {
            // Use innerHTML for simple demonstration
            props.domElement.innerHTML = `<div style="color: green;">Manual Parcel Mounted: ${props.customProp1}</div>`;
            return Promise.resolve();
        },
        // required
        unmount(props) {
            props.domElement.innerHTML = '';
            console.log(`[Parcel] Unmounting: ${props.customProp1}`);
            return Promise.resolve();
        },
        // optional
        update(props) {
            props.domElement.innerHTML = `<div style="color: blue;">Manual Parcel Updated to: ${props.customProp1}</div>`;
            console.log(`[Parcel] Updating: ${props.customProp1}`);
            return Promise.resolve();
        },
    };

    // How to mount the parcel
    const parcelProps = { domElement, customProp1: "foo" };
    const parcel = singleSpa.mountRootParcel(parcelConfig, parcelProps);
    let updatedParcel = parcel; 

    // The sequence of Parcel lifecycle events (Your Snippet)
    parcel.mountPromise
        .then(() => {
            console.log("[single-spa-demo] finished mounting manual parcel!");
            // Update
            parcelProps.customProp1 = "bar";
            return updatedParcel.update(parcelProps);
        })
        .then(() => {
            // Unmount
            return updatedParcel.unmount();
        })
        .then(() => {
            console.log("[single-spa-demo] finished unmounting manual parcel!");
        });

    return parcel; // Return the parcel instance for cleanup
}