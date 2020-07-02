import { SearchResultLOVMetadata, PinnedSearchResult, Status, SearchResult, Color } from '../search-result';
import { isContext } from 'vm';

describe('Color Model', () => {
    it('renders without error', () => {
        const modelBase = new Color();
        expect(modelBase).toBeTruthy();
    });
});

describe('SearchResult Model', () => {
    it('renders without error', () => {
        const modelBase = new SearchResult();
        expect(modelBase).toBeTruthy();
    });

    it('should setStatus', () => {
        const modelBase = new SearchResult();
        const status = Status.In_Progress;
        modelBase.setStatus(status);
        expect(modelBase.status).toBe(Status.In_Progress);
    });

    it('should get scoreAsPercentage', () => {
        const props = {
            score: 0.9
        };
        const modelBase = new SearchResult(props);
        expect(modelBase.scoreAsPercentage).toEqual(90);
    });

    it('should get serialNumber', () => {
        const props = {
            metadata: {
                'serial-number': 90
            }
        };
        const modelBase = new SearchResult(props);
        expect(modelBase.serialNumber).toEqual(90);
    });

    it('should get formatedScoreAsPercentage', () => {
        const props = {
            score: 0.9
        };
        const modelBase = new SearchResult(props);
        expect(modelBase.formatedScoreAsPercentage).toEqual('90 %');
    });

    it('should get similarityAverage', () => {
        const props = {
            text_score: 0.8,
            image_score: 0.9
        };
        const modelBase = new SearchResult(props);
        expect(modelBase.similarityAverage).toEqual(85);
    });

    it('should applyPinProperties', () => {
        let modelBase = new SearchResult();
        modelBase = SearchResult.applyPinProperties('persona', 'context', modelBase);
        expect(modelBase.pinPersona).toEqual('persona');
        expect(modelBase.pinContext).toEqual('context');
        expect(modelBase.isPinned).toBeFalsy();
    });

    it('should getNewPinContext', () => {
        const context = SearchResult.getNewPinContext();

        const d = new Date();
        const month = `00${d.getMonth() + 1}`.slice(-2);
        const date = `00${d.getDate()}`.slice(-2);
        const hours = `00${d.getHours()}`.slice(-2);
        const minutes = `00${d.getMinutes()}`.slice(-2);
        const seconds = `00${d.getSeconds()}`.slice(-2);

        expect(context).toEqual(`${month}-${date}-${d.getFullYear()}-${hours}-${minutes}-${seconds}`);
    });
});

describe('PinnedSearchResult Model', () => {
    it('renders without error', () => {
        const props = {
            id: 0,
            context: '',
            user: '',
            item: '',
            serialNumber: ''
        };
        const modelBase = new PinnedSearchResult(props);
        expect(modelBase).toBeTruthy();
    });
});

describe('SearchResultLOVMetadata Model', () => {
    it('renders without error', () => {
        const modelBase = new SearchResultLOVMetadata();
        expect(modelBase).toBeTruthy();
    });
});
