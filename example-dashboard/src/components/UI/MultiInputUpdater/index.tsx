import { AddIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import InputUpdater from "../InputUpdater";

interface Props {
    values: string[];
    onChange: (newValues: string[]) => void;
    canBeEmptyList?: boolean;
    canAdd?: boolean;
}

export default function MultiInputUpdater({
    values,
    onChange,
    canBeEmptyList,
    canAdd,
}: Props) {

    const handleRemove = (index: number) => {
        const newAllowOriginsUpdated = values.filter((_, curIndex) => curIndex !== index);
        onChange(newAllowOriginsUpdated)
    }

    const handleSingleChange = (index: number, newVal: string) => {
        const newValues = [...values];
        newValues[index] = newVal.trim();
        onChange(newValues)
    }

    const handleAddElement = () => {
        onChange([...values, ''])
    }

    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
        >
            {values.map((value, index) => {
                if (!canBeEmptyList && values.length === 1) return (
                    <InputUpdater
                        handleChange={(newVal: string) => handleSingleChange(index, newVal)}
                        value={value}
                        key={index}
                    />
                )
                return (
                    <InputUpdater
                        handleChange={(newVal: string) => handleSingleChange(index, newVal)}
                        handleRemove={() => handleRemove(index)}
                        value={value}
                        key={index}
                    />
                )
            }
            )}

            {
                canAdd && (
                    <IconButton
                        onClick={handleAddElement}
                        icon={<AddIcon />}
                        aria-label={''}
                        m={10}
                    >
                    </IconButton>
                )
            }

        </Flex>
    )
}
