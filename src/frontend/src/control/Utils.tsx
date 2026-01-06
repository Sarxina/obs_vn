'use client'

interface SimpleTextInputProps <T extends Record<string, any>, K extends keyof T> {
    labelName: string
    obj: T,
    objKey: K,
    onChange: (obj: T) => void
}

export const SimpleTextInput = <T extends Record<string, any>, K extends keyof T>({
    labelName,
    obj,
    objKey,
    onChange
}: SimpleTextInputProps<T, K>) => {
    return (
        <label className="flex flex-col gap-1 min-w-fit">
            <span className="text-sm font-medium text-gray-700">{labelName}</span>
            <input
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-base"
                value={obj[objKey]}
                onChange={e => onChange({...obj, [objKey]: e.target.value})}
            />
        </label>
    )
}

interface AddRemoveButtonProps {
    onClick: () => void
    type: 'add' | 'remove'
}

export const AddRemoveButton = ({onClick, type}: AddRemoveButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 text-2xl font-bold rounded-md transition-colors hover:opacity-80"
            style={{
                backgroundColor: type === 'add' ? '#10b981' : '#ef4444',
                color: 'white'
            }}
        >
            {type === 'add' ? '+' : '-'}
        </button>
    )
}


export const AddButton = ({onClick}: {onClick: () => void}) => {
    return (
        <AddRemoveButton
            onClick={onClick}
            type="add"
        />
    )
}
export const RemoveButton = ({onClick}: {onClick: () => void}) => {
    return (
        <AddRemoveButton
            onClick={onClick}
            type="remove"
        />
    )
}
