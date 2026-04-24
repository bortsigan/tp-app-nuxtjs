import { defineStore } from 'pinia'

export interface AuthUser {
    id: string
    name: string
    email: string
    avatar?: string
}

interface State {
    user: AuthUser | null
    token: string | null
    loading: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): State => ({ user: null, token: null, loading: false }),
    getters: {
        isAuthenticated: (s) => !!s.user && !!s.token,
    },
    actions: {
        async login(_email: string, _password: string) {
            this.loading = true
            await new Promise((r) => setTimeout(r, 300))
            this.user = {
                id: 'demo',
                name: 'Guest Printer',
                email: _email,
            }
            this.token = 'demo-token'
            this.loading = false
        },
        logout() {
            this.user = null
            this.token = null
        },
    },
})
