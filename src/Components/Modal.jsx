
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function LongContentDemo() {
    const [visible, setVisible] = useState(false);

    return (
        <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header="Job Report Form" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            lorem
            </Dialog>
        </div>
    )
}
