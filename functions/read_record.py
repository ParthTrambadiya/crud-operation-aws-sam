import json
import logging
import boto3
import os

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

response = {
    'statusCode': '',
    'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    },
    'body': ''
}

def lambda_handler(event, context):
    logger.info('Event: {}'.format(event))

    try:
        dynamodb_response = table.scan()

        response['statusCode'] = str(dynamodb_response['ResponseMetadata']['HTTPStatusCode'])
        response['body'] = json.dumps(dynamodb_response['Items'])

        return response
        
    except Exception as e:
        logger.info('Error: {}'.format(e))
        response['statusCode'] = str(502)
        response['body'] = str(e)
        
        return response
