interface PriceRawData {  
  value: number[]
}

export async function fetchPriceData (quartersRange: string[], houseTypeValue: string | undefined): Promise<PriceRawData> {
  const fetchResult = await fetch('https://data.ssb.no/api/v0/no/table/07241',
    {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'query': [
					{
						'code': 'Boligtype',
						'selection': {
							'filter': 'item',
							'values': [
								houseTypeValue
							]
						}
					},
					{
						'code': 'ContentsCode',
						'selection': {
						'filter': 'item',
							'values': [
								'KvPris'
							]
						}
					},
					{
						'code': 'Tid',
						'selection': {
							'filter': 'item',
							'values': quartersRange
						}
					}
				],
				'response': {
					'format': 'json-stat2'
				}
			})
    })
  return fetchResult.json();
}
