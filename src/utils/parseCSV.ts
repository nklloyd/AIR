import Papa from 'papaparse';

export async function loadFlightData(): Promise<any[]> {
  const response = await fetch('/mock_data/mock_flight_data.csv');
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results: { data: any[] | PromiseLike<any[]>; }) => resolve(results.data),
      error: (err: any) => reject(err),
    });
  });
}
