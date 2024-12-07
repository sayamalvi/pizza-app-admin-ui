import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoginPage from './login'

// getBy -> throws and error
// findBy -> async
// queryBy -> null
describe("Login Page", () => {
    it('should render with required fields', () => {
        render(<LoginPage />)
        expect(screen.getByText(/Sign In/)).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
        expect(screen.getByRole('checkbox', { name: 'Remember Me' })).toBeInTheDocument()
        expect(screen.getByText('Forgot password')).toBeInTheDocument()
    })
})