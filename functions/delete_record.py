import json
import logging
import boto3
import os
from boto3.dynamodb.conditions import Attr

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

    body = json.loads(event['body'])

    email = body['email']

    key = {
        'email': email
    }

    try:
        dynamodb_response = table.delete_item(
            Key=key,
            ConditionExpression=Attr('email').exists()
        )

        response['statusCode'] = str(dynamodb_response['ResponseMetadata']['HTTPStatusCode'])
        response['body'] = json.dumps('Record deleted successfully!')

        return response
        
    except Exception as e:
        logger.info('Error: {}'.format(e))
        response['statusCode'] = str(502)
        response['body'] = str(e)
        
        return response
