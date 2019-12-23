import { createXPath } from '../create-xpath';

describe('create-xpath', () => {
  test('creates XPath for element', async () => {
    page.setContent(`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Document</title>
			</head>
			<body>
				<div>
					<div>
						<div>
							<span id="hello">hello</span>
						</div>
					</div>
				</div>
			</body>
			</html>
		`);

    const element = await page.$('#hello');
    if (!element) throw Error();

    const result = await createXPath(element);
    expect(result).toBe('/html/body[@position()=2]/div/div/div/span');
  });

  test('creates XPath with element that has siblings', async () => {
    page.setContent(`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Document</title>
			</head>
			<body>
				<div>
					<div>
						<div>
							<span>hello</span>
							<span id="hello">hello</span>
							<span>hello</span>
						</div>
					</div>
				</div>
			</body>
			</html>
		`);

    const element = await page.$('#hello');
    if (!element) throw Error();

    const result = await createXPath(element);
    expect(result).toBe(
      '/html/body[@position()=2]/div/div/div/span[@position()=2]',
    );
  });
});
