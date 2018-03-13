import * as React from "react";
import { SectionBase } from "../abstractions/section-base";
import { HTMLElementProps } from "../contracts";

export interface DropdownSectionProps extends HTMLElementProps<HTMLDivElement> {
    // HACK: Workaround of rule "intersection types should be consistent"
    ref?: React.Ref<DropdownSection>;
}

export class DropdownSection extends SectionBase<DropdownSectionProps> {
    protected onContainerClickCallback: React.MouseEventHandler<HTMLDivElement> = event => {
        event.stopPropagation();
        this.onSectionClick();

        if (this.props.onClick != null) {
            event.persist();
            this.props.onClick(event);
        }
    };

    public render(): JSX.Element | null {
        if (!this.isOpen()) {
            return null;
        }

        return <div {...this.getRestProps(this.props)} onClick={this.onContainerClickCallback} />;
    }
}
