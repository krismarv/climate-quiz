import React, { useState } from "react";

export function useSetQClicked () {
    const [qClicked, setQClicked] = React.useState()
    return {
        qClicked, 
        setQClicked
    }
}