import React from 'react'

export default function InputRadio({ placeholder }: { placeholder: string }) {
    return (
        <fieldset>
            <legend>{placeholder}:</legend>

            <div>
                <input className='mr-4' type="radio" id="oui" name="stock" value="oui" />
                <label htmlFor="oui">Oui</label>
            </div>

            <div>
                <input className='mr-4' type="radio" id="no" name="stock" value="no" />
                <label htmlFor="no">Non</label>
            </div>
        </fieldset>

    )
}
