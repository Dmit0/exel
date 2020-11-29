import { capitalize } from "@core/utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(`No method ${method} in ${name} provided`)
            }
           this[method] = this[method].bind(this)
           this.$root.on(listener, this[method].bind(this))
        })
    }

    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(`No method ${method} in ${name} provided`)
            }
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return `on${capitalize(eventName)}`
}
