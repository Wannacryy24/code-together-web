import mixpanel from "mixpanel-browser"

/**
 * Track a Mixpanel event with consistent formatting.
 * 
 * @param {string} eventName - Name of the event (e.g., "Logo Clicked")
 * @param {object} [props={}] - Additional properties to send with the event
 */

const trackEvents = (eventName , props = {}) => {
    try {
        mixpanel.track(eventName, {
            ...props,
            timestamp: new Date().toISOString()
        })
    } catch (e){
        console.warn("MixPanel Tracking Error ",e)
    }
}

export default trackEvents;