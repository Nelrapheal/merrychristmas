// Snowfall Animation
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('snow-canvas'), 
            alpha: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 5;

        const snowGeometry = new THREE.BufferGeometry();
        const snowVertices = [];
        
        for (let i = 0; i < 4000; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            snowVertices.push(x, y, z);
        }
        
        snowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(snowVertices, 3));
        const snowMaterial = new THREE.PointsMaterial({ 
            color: 0xffffff, 
            size: 0.15,
            transparent: true,
            opacity: 0.8
        });
        const snow = new THREE.Points(snowGeometry, snowMaterial);
        scene.add(snow);

        function animateSnow() {
            requestAnimationFrame(animateSnow);
            
            const positions = snow.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] -= 0.03;
                if (positions[i] < -50) {
                    positions[i] = 50;
                }
            }
            snow.geometry.attributes.position.needsUpdate = true;
            snow.rotation.y += 0.0003;
            
            renderer.render(scene, camera);
        }
        animateSnow();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        function updateCountdown() {
            const newYear = new Date('January 1, 2026 00:00:00').getTime();
            const now = new Date().getTime();
            const distance = newYear - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                document.getElementById('countdown').innerHTML = '<h2>🎉 HAPPY NEW YEAR 2026! 🎉</h2>';
                createFireworks();
            }
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Card Generator
        document.getElementById('cardForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const recipientName = document.getElementById('recipientName').value;
            const message = document.getElementById('cardMessage').value;
            const senderName = document.getElementById('senderName').value;
            
            generateCard(recipientName, message, senderName);
        });

        function generateCard(recipient, message, sender) {
            const canvas = document.getElementById('cardCanvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size (standard card size)
            canvas.width = 1200;
            canvas.height = 800;
            
            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#0d1117');
            gradient.addColorStop(0.5, '#1a0a0a');
            gradient.addColorStop(1, '#0a1a0a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add decorative circles
            ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
            ctx.beginPath();
            ctx.arc(200, 150, 150, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
            ctx.beginPath();
            ctx.arc(1000, 650, 180, 0, Math.PI * 2);
            ctx.fill();
            
            // Border
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
            ctx.lineWidth = 4;
            ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
            
            // Inner border
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
            
            // Decorative elements
            ctx.font = '60px Arial';
            ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
            ctx.fillText('🎄', 80, 100);
            ctx.fillText('⭐', canvas.width - 140, 120);
            ctx.fillText('🎁', 100, canvas.height - 60);
            ctx.fillText('🔔', canvas.width - 160, canvas.height - 60);
            
            // Title
            ctx.font = 'bold 80px serif';
            ctx.fillStyle = '#ef4444';
            ctx.textAlign = 'center';
            ctx.fillText('Merry Christmas', canvas.width / 2, 150);
            
            // Recipient name
            ctx.font = 'bold 50px serif';
            ctx.fillStyle = '#22c55e';
            ctx.fillText(`Dear ${recipient},`, canvas.width / 2, 240);
            
            // Message (word wrap)
            ctx.font = '28px sans-serif';
            ctx.fillStyle = '#ffffff';
            const maxWidth = canvas.width - 200;
            const lineHeight = 45;
            const words = message.split(' ');
            let line = '';
            let y = 330;
            
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                
                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, canvas.width / 2, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, canvas.width / 2, y);
            
            // Sender
            ctx.font = 'italic 32px serif';
            ctx.fillStyle = '#fbbf24';
            ctx.fillText(`- ${sender}`, canvas.width / 2, canvas.height - 120);
            
            // Year
            ctx.font = 'bold 24px sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillText('2025', canvas.width / 2, canvas.height - 60);
            
            // Download the card
            setTimeout(() => {
                const link = document.createElement('a');
                link.download = `Christmas_Card_${recipient.replace(/\s+/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                alert('🎄 Your Christmas card has been downloaded! Check your downloads folder.');
            }, 100);
        }

        // Share Functions
        function shareWhatsApp() {
            const text = '🎄 Merry Christmas! 🎄\n\nCheck out this beautiful Christmas celebration page!\n\n' + window.location.href;
            window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
        }
        
        function copyLink() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('🎁 Link copied! Share it with your loved ones!');
            });
        }

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });