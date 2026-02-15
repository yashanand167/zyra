import { useState } from "react";

export default function useContextMenu() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const showContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        setVisible(true);
    };

    const hideContextMenu = () => {
        setVisible(false);
    };

    return {
        position,
        visible,
        showContextMenu,
        hideContextMenu,
    };
}