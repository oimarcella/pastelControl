import {queryByText, render, screen, waitFor} from '@testing-library/react';
import {FlavorsProvider} from './FlavorsContext';
import useFlavors from './FlavorsContext';
import { describe, expect, test } from 'vitest';

function MockComponent() {
    const {flavors, addNewFlavor, deleteFlavor} = useFlavors();

    /*useEffect  (() => {
        addNewFlavor('Pipoca');
        deleteFlavor('Queijo');
    }, []);*/
    
    return (
        <div>
            <ul data-testid="flavors-list">
                {flavors.map((flavor, index) => (
                <li key={index}>{flavor}</li>
                ))}
            </ul>
            {/**/}
            <button data-testid="addFlavorChocolate" onClick={() => addNewFlavor('Chocolate')}>Add Chocolate</button>
            <button data-testid="deleteFlavorCarne" onClick={() => deleteFlavor('Carne')}>Delete Carne</button>
            <button data-testid="deleteFlavorQueijo" onClick={() => deleteFlavor('Queijo')}>Delete Queijo</button>  
        </div>
    );
}

describe('FlavorsContext', () => {
    test ('Deve permitir excluir um sabor', async () => {
        render(
            <FlavorsProvider>
                <MockComponent />
            </FlavorsProvider>
        );

        const deleteButtonQueijo = screen.getByTestId('deleteFlavorQueijo');
        deleteButtonQueijo.click();
        await waitFor(() => {
            expect(screen.queryByText("Queijo")).not.toBeInTheDocument();
        });

        const deleteButtonCarne = screen.getByTestId('deleteFlavorCarne');
        deleteButtonCarne.click("Carne");
        await waitFor(() => {
            expect(screen.queryByText("Carne")).not.toBeInTheDocument();
        });

        const flavorsList = screen.getByTestId('flavors-list');
        const listItems = flavorsList.children;
        expect(listItems).toHaveLength(1);
    })

    test('Deve renderizar todos os sabores', () => {
        render(
            <FlavorsProvider>
                <MockComponent />
            </FlavorsProvider>
        );
    
        const flavorsList = screen.getByTestId('flavors-list');
        const listItems = flavorsList.children;
        expect(listItems).toHaveLength(3);
    })

    test("Deve permitir adicionar um novo sabor", async ()=>{
        render(
            <FlavorsProvider>
                <MockComponent />
            </FlavorsProvider>
        );

        const addButtonChocolate = screen.getByTestId('addFlavorChocolate');
        addButtonChocolate.click();
        await waitFor(() => {
            expect(screen.getByText("Chocolate")).toBeInTheDocument();
        });

        const flavorsList = screen.getByTestId('flavors-list');
        const listItems = flavorsList.children;
        expect(listItems).toHaveLength(4);
    })
})

