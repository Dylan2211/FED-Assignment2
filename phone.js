document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.trending-filter');
    
    filters.forEach(filter => {
        const btn = filter.querySelector('.filter-btn');
        const dropdown = filter.querySelector('.filter-dropdown');
        
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            filters.forEach(f => {
                if(f !== filter) f.querySelector('.filter-dropdown').style.display = 'none';
            });
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    });

    document.addEventListener('click', function(e) {
        if(!e.target.closest('.trending-filter')) {
            document.querySelectorAll('.filter-dropdown').forEach(d => {
                d.style.display = 'none';
            });
        }
    });
});