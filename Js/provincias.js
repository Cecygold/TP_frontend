
document.addEventListener('DOMContentLoaded', function() {
	fetch('http://localhost:3002/provincias')
		.then(response => response.json())
		.then(data => {
			const select = document.getElementById('provincia');
			data.forEach(provincia => {
				const option = document.createElement('option');
				option.value = provincia.short_name;
				option.textContent = provincia.name;
				select.appendChild(option);
			});
		})
		.catch(error => {
			console.error('Error fetching provincias:', error);
		});
});