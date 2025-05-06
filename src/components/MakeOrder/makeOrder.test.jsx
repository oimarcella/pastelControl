import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vitest } from "vitest";
import MakeOrder from "./index.jsx";
import { FlavorsProvider } from "../../../context/FlavorsContext.js";
import {emitMock} from "../../setupTests.js";

describe("MakeOrder - component", () => {
    test("Deve haver um campo para receber nome do cliente", ()=>{
        render(
            <FlavorsProvider>
                <MakeOrder />
            </FlavorsProvider>
        );
        const input = screen.getByTestId("clientNameInput");
        fireEvent.change(input, { target: { value: "Jon Doe" } });

        expect(input.value).toBe("Jon Doe");
    })

    test("A tela deve possuir um botao para criar o pedido", ()=>{
        render(
            <FlavorsProvider>
                <MakeOrder />
            </FlavorsProvider>
        );
        const button = screen.getByText("Enviar Pedido");
        expect(button).toHaveAttribute('type','button');
        expect(button).toBeInTheDocument();
    })
    
    test("Nao deve permitir criar um pedido sem nome do cliente", ()=>{
        render(
            <FlavorsProvider>
                <MakeOrder />
            </FlavorsProvider>
        );
        const button = screen.getByText("Enviar Pedido");
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith('Digite o nome do cliente');
    })

    test("Nao deve permitir criar um pedido sem ao menos um sabor", ()=>{
        render(
            <FlavorsProvider>
                <MakeOrder />
            </FlavorsProvider>
        )

        const input = screen.getByTestId("clientNameInput");
        fireEvent.change(input, { target: { value: "Jon Doe" } });
        const button = screen.getByText("Enviar Pedido");
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith("Selecione ao menos 1 pastel");
    })

    test("Deve permitir criar um pedido com sucesso", ()=>{
        const mockFlavors = ["Pizza"];

        render(
            <FlavorsProvider value={{flavors: mockFlavors}}>
                <MakeOrder />
            </FlavorsProvider>
        )


        const input = screen.getByTestId("clientNameInput");
        fireEvent.change(input, { target: { value: "Jon Doe" } });
        const flavorInput = screen.getByTestId("flavor-Pizza");
        fireEvent.change(flavorInput, { target: { value: 1 } });
        const button = screen.getByText("Enviar Pedido");
        button.click();

        expect(emitMock).toHaveBeenCalled();

        expect(emitMock).toHaveBeenNthCalledWith(6, "newOrder",{
            client: "Jon Doe",
            isDone: false, 
            id: 1,
            hour: expect.any(String),
            items: [{ flavor:'Pizza', quantity:1 }]
        });
        
    })
    
})