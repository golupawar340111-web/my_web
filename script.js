// =========================================================================
// 1. SUPABASE CONFIGURATION & INITIALIZATION (FIXED GLOBAL CONFLICT)
// =========================================================================
const SUPABASE_URL = 'https://rsgkdamcivbzhjxmynst.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZ2tkYW1jaXZiemhqeG15bnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MTMwOTMsImV4cCI6MjA5ODA4OTA5M30.qVbq9y1Qjq8rh1aceMV7booX7P5LlVHljieLibptR6Y';

// Variable ka naam 'supabaseClient' rakha hai taaki global scope se crash na ho
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// =========================================================================
// 2. OUR WORK / SAMPLE WEBSITES CLICK LOGIC
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const sampleCards = document.querySelectorAll(".sample-card");

    sampleCards.forEach((card) => {
        card.style.cursor = "pointer";
        
        card.addEventListener("click", (e) => {
            e.stopPropagation();
            
            const targetUrl = card.getAttribute("data-url");
            if (targetUrl) {
                // Foolproof virtual link trigger to bypass popup blockers
                const fakeLink = document.createElement('a');
                fakeLink.href = targetUrl;
                fakeLink.target = '_blank';
                fakeLink.rel = 'noopener noreferrer';
                fakeLink.click();
            } else {
                alert("This is a live demo preview. The live link will be added soon!");
            }
        });
    });
});


// =========================================================================
// 3. PRICING BUTTONS & SUPABASE LEAD TRACKING
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const pricingButtons = document.querySelectorAll(".plan-btn");

    pricingButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const planCard = button.closest(".plan");
            const packageName = planCard.querySelector(".plan-name").innerText;
            
            console.log(`Selecting package: ${packageName}`);

            try {
                // Using 'supabaseClient' here as well
                const { data, error } = await supabaseClient
                    .from('leads')
                    .insert([
                        { package_name: packageName }
                    ]);

                if (error) throw error;
                console.log("Lead successfully saved to Supabase!");
            } catch (error) {
                console.error("Supabase Error:", error.message || error);
            }

            // Open WhatsApp smoothly
            const whatsappText = encodeURIComponent(`Hello SeedhaDeveloper Studio, I am interested in your "${packageName}" package. Please provide me with more details.`);
            const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;
            
            const whatsappLink = document.createElement('a');
            whatsappLink.href = whatsappUrl;
            whatsappLink.target = '_blank';
            whatsappLink.click();
        });
    });
});


// =========================================================================
// 4. FAQ ACCORDION INTERACTION
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const answerDiv = document.createElement("div");
        answerDiv.className = "faq-answer";
        answerDiv.style.display = "none";
        answerDiv.style.padding = "10px 0";
        answerDiv.style.color = "var(--text-muted, #888)";
        answerDiv.innerText = "For detailed information regarding this question, please contact us directly via WhatsApp or Email. We usually reply within 24 hours.";
        item.appendChild(answerDiv);

        item.addEventListener("click", () => {
            const plusIcon = item.querySelector(".faq-plus");
            const isOpened = answerDiv.style.display === "block";

            if (isOpened) {
                answerDiv.style.display = "none";
                plusIcon.innerText = "+";
                plusIcon.style.transform = "rotate(0deg)";
            } else {
                answerDiv.style.display = "block";
                plusIcon.innerText = "−";
                plusIcon.style.transform = "rotate(180deg)";
            }
        });
    });
});