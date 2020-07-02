import React, { FunctionComponent, ReactElement, useRef } from 'react';
import Tree, { TreeProps } from 'rc-tree';
import 'rc-tree/assets/index.css';
import { DataNode, EventDataNode, Key as TreeKey } from 'rc-tree/lib/interface';

// K2TreOnSelectPayload mirrors the info type passed from rc-tree onSelect (see Tree.d.ts).
// For some unknownn reason the creators of rc-tree did not export an interface.
export interface K2TreeOnSelectPayload {
    event: 'select';
    selected: boolean;
    node: EventDataNode;
    selectedNodes: DataNode[];
    nativeEvent: MouseEvent;
}

export interface K2DataNode extends DataNode {
    children: K2DataNode[];
}

export interface IHashK2DataNode {
    [key: string]: K2DataNode;
}

export interface K2TreeProps extends Omit<TreeProps, 'prefixCls'> {}

const onExpand = (expandedKeys: any) => {
    console.log('onExpand', expandedKeys);
};

const onSelect = (props: K2TreeProps, selectedKeys: TreeKey[], selectionPayload: K2TreeOnSelectPayload) => {
    if (props.onSelect) {
        props.onSelect(selectedKeys, selectionPayload);
    }
};

export const K2Tree: FunctionComponent<K2TreeProps> = (props): ReactElement => {
    const treeRef = useRef(null);

    return (
        <Tree
            ref={treeRef}
            showLine={true}
            checkable={false}
            defaultExpandAll={true}
            onExpand={onExpand}
            onSelect={onSelect.bind(null, props)}
            treeData={props.treeData}
            onActiveChange={(key) => console.log('Active:', key)}
            selectedKeys={props.selectedKeys}
        ></Tree>
    );
};
