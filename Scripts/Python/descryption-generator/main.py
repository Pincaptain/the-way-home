import requests
from bs4 import BeautifulSoup

def warning():
	print('Warning: Executing this file can result in serious code damage!')
	print('Are you sure you want to continue?')
	warning_input = input('Y/N')
	
	if warning_input != 'Y':
		exit()

def fetch(url):
	response = requests.get(url)

	if response.status_code != 200:
		print(f'Error: {response.status_code}')
		return

	soup = BeautifulSoup(response.content, 'html.parser')
	
	return soup

def prettify(soup):
	entries = []

	for item in soup.find_all('li'):
		text = item.text.strip()

		if text[len(text) - 1].isnumeric():
			index = len(text) - 1

			for i in range(len(text) - 1, -1, -1):
				if text[i] != ' ' and not text[i].isnumeric():
					index = i

					break

			entry = text[0:index]

			entries.append(entry)
			print(f'Information: "{entry}" was successfully appended!')
		else:
			print(f'Warning: "{text}" is an invalid description!')
	
def put(entries, dest):
	try:
		with open(dest, 'w') as file:
			file.write(str(entries))
			
		return True
	except:
		print('Error: Cannot write to file!')
		print('Please contact Borjan. He will know what to do!')
		
		return False

def main():
	warning()
	soup = fetch('https://sentence.yourdictionary.com/game')
	entries = prettify(soup)
	successful = put(entries)
	
	if successful:
		print('Information: Congratulations! You took a great risk! But to live is to risk it all, otherwise you\'re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.')

if __name__ == '__main__':
	main()