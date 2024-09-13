import {render, screen} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Login from "../pages/Login"
import { MemoryRouter, Router } from "react-router-dom"
import { QueryClientProvider, QueryClient } from 'react-query';
import AuthProvider from "../hooks/AuthProvider";
import '@testing-library/jest-dom'

it('Should have a username and password field and a login button', () => {
    const queryClient = new QueryClient()
    const logOut = jest.fn()
    const loginAction = jest.fn()

    render(
    <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <AuthProvider >
                    <Login/>
                </AuthProvider>
            </MemoryRouter>
    </QueryClientProvider>

    )

    const usernameField = screen.getByTestId("usernameTest")
    const passwordField = screen.getByTestId("passwordTest")
    const submitButton =  screen.getByText("Log in")

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
})