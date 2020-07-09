import * as React from 'react';

import classNames from 'classnames';
import './APIDisplay.scss';

interface IAPIDisplayProps {
  journal: any[];
}

export default class APIDisplay extends React.Component<IAPIDisplayProps> {
  public render() {
    const { journal } = this.props;
    if (journal.length === 0) {
      return (
        <h4 className={classNames('ta-label', 'vads-u-margin--2')}>
          Watch here for VA API Access Information
        </h4>
      );
    } else {
      return (
        <div
          className={classNames(
            'vads-u-margin-left--1',
            'vads-u-margin-right--1',
            'vads-u-padding-bottom--2',
          )}
        >
          <h4 className={classNames('ta-label', 'vads-u-margin-top--2')}>VA API Access</h4>
          {journal.map((item, itemIndex) => {
            return (
              <div
                key={`api-${itemIndex}`}
                className={classNames(
                  'content-wrapper',
                  'vads-u-border--1px',
                  'vads-u-margin-top--1',
                  'vads-u-padding--1',
                )}
              >
                <h5>URL: {item.targetUrl}</h5>
                <ul>
                  <li>
                    <span className={classNames('ta-label', 'item-label', 'vads-u-font-size--md')}>
                      ResponseCode
                    </span>
                    <span className={classNames('item-value')}>{item.responseCode}</span>
                  </li>
                  <li>
                    <span className={classNames('ta-label', 'item-label', 'vads-u-font-size--md')}>
                      ReceivedContent
                    </span>
                    <span className={classNames('item-value')}>
                      {item.attributeMap.receivedContent}
                    </span>
                  </li>
                  <li>
                    <span className={classNames('ta-label', 'item-label', 'vads-u-font-size--md')}>
                      RequestSentTime
                    </span>
                    <span className={classNames('item-value')}>{item.requestSentTime}</span>
                  </li>
                  <li>
                    <span className={classNames('ta-label', 'item-label', 'vads-u-font-size--md')}>
                      ResponseReceivedTime
                    </span>
                    <span className={classNames('item-value')}>{item.responseReceivedTime}</span>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
  }
}
/*
                <code>
                    {
                      '[{"targetUrl":"https://sandbox-api.va.gov/services/vba_documents/v1/uploads","attributeMap":{"receivedContent":"{"data":{"id":"2b0a5174-3135-4700-b0ab-f12f83feda97","type":"document_upload","attributes":{"guid":"2b0a5174-3135-4700-b0ab-f12f83feda97","status":"pending","code":null,"detail":null,"location":"https://sandbox-api.va.gov/services_user_content/vba_documents/2b0a5174-3135-4700-b0ab-f12f83feda97?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQD72FDTFWPUWR5OZ%2F20200708%2Fus-gov-west-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T200755Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=c15f6d4e74e090d338487309e4a7ce0c5305a3a6bd871c2d27bafa6b124c2be3","updated_at":"2020-07-08T20:07:55.746Z"}}}"},"responseCode":"202","requestSentTime":"2020-07-08T20:07:54.787+0000","responseReceivedTime":"2020-07-08T20:07:55.824+0000"},{"targetUrl":"https://sandbox-api.va.gov/services_user_content/vba_documents/2b0a5174-3135-4700-b0ab-f12f83feda97?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQD72FDTFWPUWR5OZ%2F20200708%2Fus-gov-west-1%2Fs3%2Faws4_request&X-Amz-Date=20200708T200755Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=c15f6d4e74e090d338487309e4a7ce0c5305a3a6bd871c2d27bafa6b124c2be3","attributeMap":{"eTagHeaderValue":""5059bbd0cc3c88b54d29dea610f2c8ec""},"responseCode":"200","requestSentTime":"2020-07-08T20:07:55.844+0000","responseReceivedTime":"2020-07-08T20:07:57.460+0000"},{"targetUrl":"https://sandbox-api.va.gov/services/vba_documents/v1/uploads/2b0a5174-3135-4700-b0ab-f12f83feda97","attributeMap":{"receivedContent":"{"data":{"id":"2b0a5174-3135-4700-b0ab-f12f83feda97","type":"document_upload","attributes":{"guid":"2b0a5174-3135-4700-b0ab-f12f83feda97","status":"pending","code":null,"detail":null,"location":null,"updated_at":"2020-07-08T20:07:55.746Z"}}}"},"responseCode":"200","requestSentTime":"2020-07-08T20:07:57.462+0000","responseReceivedTime":"2020-07-08T20:07:57.782+0000"}]'
                    }
                  </code> 

*/
