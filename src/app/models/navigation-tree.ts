import { ModelBase } from 'app/shared';
import { AppRoute } from 'app/models';
import { DataNode } from 'rc-tree/lib/interface';
import { IHashK2DataNode } from 'app/k2-mui-core';
import { Key as TreeKey } from 'rc-tree/lib/interface';
import { K2TreeOnSelectPayload } from 'app/k2-mui-core';

interface INavigationTree {
    treeData: DataNode[];
}

export interface INavigationItem {
    id: TreeKey;
    parentId: string | null;
    label: string;
    component?: React.ComponentType<any>;
    selectable?: boolean;
}

export class NavigationTreeClass extends ModelBase implements INavigationTree {
    treeData: DataNode[];

    private navigationList: INavigationItem[] = [
        { id: 'Controls', parentId: null, label: 'Controls', selectable: false },
        { id: 'Solutions', parentId: null, label: 'Solutions', selectable: false },
        { id: 'Directives', parentId: null, label: 'Directives', selectable: false },
        { id: 'Projects', parentId: null, label: 'Projects', selectable: false },
        { id: 'CreateProjectPage', parentId: 'Projects', label: 'Create Project ...' }
    ];

    constructor(properties?: any) {
        super();
        this.override(properties);
        this.transformListToTree();
    }

    private transformListToTree() {
        // Highly-performant mechanism to create navigation tree from navigation list. Copied the pattern from stackoverflow, but modified to our needs.
        // https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript/40732240#40732240
        const hashTable: IHashK2DataNode = Object.create(null);
        this.navigationList.forEach((navigationItem: INavigationItem) => {
            hashTable[navigationItem.id] = { key: navigationItem.id, title: navigationItem.label, children: [], selectable: navigationItem?.selectable };
        });

        const dataTree: DataNode[] = [];
        this.navigationList.forEach((navigationItem: INavigationItem) => {
            if (navigationItem.parentId !== null) hashTable[navigationItem.parentId].children.push(hashTable[navigationItem.id]);
            else dataTree.push(hashTable[navigationItem.id]);
        });
        this.treeData = dataTree;
    }

    getTreeKeyToHighlight(): TreeKey {
        return AppRoute.getTabRoute()?.id || '';
    }

    getNavigationListItem(id: TreeKey): INavigationItem | undefined {
        return this.navigationList.find((navigationItem) => {
            return navigationItem.id === id;
        });
    }

    handleSelectTreeNode(treeInfo: K2TreeOnSelectPayload) {
        // Do nothing if user clicks on tree node that is currently highlighted
        if (!treeInfo.selected) return;
        if (AppRoute.history) AppRoute.history.push(AppRoute.getNextLocation(treeInfo.node.key));
    }

    static default: INavigationTree = {
        treeData: []
    };
}

export const NavigationTree = new NavigationTreeClass(NavigationTreeClass.default);
