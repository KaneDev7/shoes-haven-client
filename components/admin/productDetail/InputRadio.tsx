import React from 'react'

export default function InputRadio({ placeholder }: { placeholder: string }) {
    return (
        <fieldset>
            <legend>{placeholder}:</legend>

            <div>
                <input className='mr-4' type="radio" id="yes" name="stock" value={1} />
                <label htmlFor="yes">Oui</label>
            </div>

            <div>
                <input className='mr-4' type="radio" id="no" name="stock" value={0} />
                <label htmlFor="no">Non</label>
            </div>
        </fieldset>

    )
}
