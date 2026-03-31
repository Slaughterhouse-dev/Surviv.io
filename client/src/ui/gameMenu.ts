import $ from "jquery";

export class GameMenu {
    isActive = false;
    menuElement: JQuery;
    smoothScroll: SmoothScroll | null = null;
    smoothSliders: Map<HTMLInputElement, SmoothSlider> = new Map();
    ease_show = 200; // Длительность анимации открытия в ms (быстро, но видна анимация)
    ease_hide = 200; // Длительность анимации закрытия в ms
    isAnimating = false; // Флаг анимации

    constructor() {
        // Создаем HTML для игрового меню
        this.menuElement = this.createMenuHTML();
        
        // Обработчики для кнопок
        this.setupButtons();
        this.setupInteractions();
        
        // Initialize smooth scroll
        this.initSmoothScroll();
    }

    private createMenuHTML(): JQuery {
        // Проверяем, не существует ли уже меню
        if ($("#game-menu").length > 0) {
            return $("#game-menu");
        }

        const menuHTML = `
            <div id="game-menu" class="modal" style="display: none;">
                <div class="modal-content game-menu-content">
                    <!-- Sidebar -->
                    <div class="game-menu-sidebar">
                        <!-- Logo -->
                        <div class="sidebar-logo">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 6v6l4 2"></path>
                            </svg>
                        </div>
                        
                        <div class="sidebar-divider"></div>
                        
                        <div class="sidebar-item active" data-tab="main">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62c.16-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Z"/></svg>
                        </div>
                        <div class="sidebar-item" data-tab="combat">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m7.048 13.406l3.535 3.536l-1.413 1.414l1.415 1.415l-1.414 1.414l-2.475-2.475l-2.829 2.829l-1.414-1.414l2.829-2.83l-2.475-2.474l1.414-1.414l1.414 1.413zM3 3l3.546.003l11.817 11.818l1.415-1.414l1.415 1.414l-2.475 2.475l2.828 2.829l-1.414 1.414l-2.829-2.829l-2.474 2.475l-1.415-1.414l1.414-1.415L3.002 6.531zm14.457 0L21 3.003l.002 3.523l-4.053 4.052l-3.536-3.535z"/></svg>
                        </div>
                        <div class="sidebar-item" data-tab="visual">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                        </div>
                        <div class="sidebar-item" data-tab="player">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
                        </div>
                        <div class="sidebar-item" data-tab="misc">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg>
                        </div>
                        <div class="sidebar-item" data-tab="info">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12 12"><path fill="currentColor" d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0m-5.5.5V8a.5.5 0 0 0 1 0V6.5a.5.5 0 0 0-1 0M6 3.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5"/></svg>
                        </div>
                    </div>

                    <!-- Main Content -->
                    <div class="game-menu-main">
                        <!-- Header -->
                        <div class="modal-header">
                            <div class="header-search">
                                <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                <input type="text" class="search-input" placeholder="Search settings...">
                                <button class="search-clear" style="display: none;" type="button">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                                
                                <!-- Search Results Dropdown -->
                                <div class="search-results-wrapper" style="display: none;">
                                    <div class="search-results">
                                        <div class="search-results-content"></div>
                                    </div>
                                </div>
                            </div>
                            <button class="close">✕</button>
                        </div>

                        <!-- Content Area -->
                        <div class="modal-body">
                            <!-- Main Tab -->
                            <div class="tab-content active" data-content="main">
                                <!-- UI Components Group -->
                                <div class="setting-group">
                                    <div class="group-title">UI COMPONENTS</div>
                                    
                                    <!-- Checkbox -->
                                    <div class="setting-item">
                                        <div class="setting-label">Checkbox</div>
                                        <label class="checkbox-container">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>

                                    <!-- Slider -->
                                    <div class="setting-item">
                                        <div class="setting-label">Range Slider</div>
                                        <div class="slider-container">
                                            <input type="range" class="custom-slider" min="0" max="100" value="75">
                                            <span class="slider-value">75%</span>
                                        </div>
                                    </div>

                                    <!-- Dropdown -->
                                    <div class="setting-item">
                                        <div class="setting-label">Dropdown Select</div>
                                        <div class="custom-dropdown-wrapper">
                                            <button class="custom-dropdown-button" type="button">
                                                <span class="dropdown-selected">Choose a size</span>
                                                <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </button>
                                            <div class="dropdown-menu" style="display: none;">
                                                <div class="dropdown-item" data-value="small">Small</div>
                                                <div class="dropdown-item" data-value="medium">Medium</div>
                                                <div class="dropdown-item" data-value="large">Large</div>
                                                <div class="dropdown-item" data-value="xlarge">Extra Large</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- More Checkboxes -->
                                    <div class="setting-item">
                                        <div class="setting-label">Enable Notifications</div>
                                        <label class="checkbox-container">
                                            <input type="checkbox">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">Auto Save</div>
                                        <label class="checkbox-container">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">Show FPS Counter</div>
                                        <label class="checkbox-container">
                                            <input type="checkbox">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <!-- Input Fields Group -->
                                <div class="setting-group">
                                    <div class="group-title">INPUT FIELDS</div>
                                    
                                    <!-- Color Picker -->
                                    <div class="setting-item">
                                        <div class="setting-label">Color Picker</div>
                                        <div class="color-picker-wrapper">
                                            <input type="color" class="color-input" value="#0F4A38">
                                            <input type="text" class="color-hex" value="#0F4A38" readonly>
                                        </div>
                                    </div>

                                    <!-- Text Input -->
                                    <div class="setting-item">
                                        <div class="setting-label">Text Input</div>
                                        <input type="text" class="custom-input" placeholder="Enter text...">
                                    </div>

                                    <!-- Number Input -->
                                    <div class="setting-item">
                                        <div class="setting-label">Number Input</div>
                                        <div class="number-input-wrapper">
                                            <input type="number" class="custom-input custom-number-input" value="100" min="0" max="999">
                                            <div class="number-controls">
                                                <button class="number-btn number-up" type="button">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                        <polyline points="18 15 12 9 6 15"></polyline>
                                                    </svg>
                                                </button>
                                                <button class="number-btn number-down" type="button">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- More Text Inputs -->
                                    <div class="setting-item">
                                        <div class="setting-label">Username</div>
                                        <input type="text" class="custom-input" placeholder="Enter username...">
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">Email</div>
                                        <input type="email" class="custom-input" placeholder="Enter email...">
                                    </div>
                                </div>
                                
                                <!-- Audio Settings Group -->
                                <div class="setting-group">
                                    <div class="group-title">AUDIO SETTINGS</div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">Master Volume</div>
                                        <div class="slider-container">
                                            <input type="range" class="custom-slider" min="0" max="100" value="80">
                                            <span class="slider-value">80%</span>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">Music Volume</div>
                                        <div class="slider-container">
                                            <input type="range" class="custom-slider" min="0" max="100" value="60">
                                            <span class="slider-value">60%</span>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">SFX Volume</div>
                                        <div class="slider-container">
                                            <input type="range" class="custom-slider" min="0" max="100" value="90">
                                            <span class="slider-value">90%</span>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">Mute Audio</div>
                                        <label class="checkbox-container">
                                            <input type="checkbox">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                                
                                <!-- Performance Group -->
                                <div class="setting-group">
                                    <div class="group-title">PERFORMANCE</div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">Graphics Quality</div>
                                        <div class="custom-dropdown-wrapper">
                                            <button class="custom-dropdown-button" type="button">
                                                <span class="dropdown-selected">High</span>
                                                <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </button>
                                            <div class="dropdown-menu" style="display: none;">
                                                <div class="dropdown-item" data-value="low">Low</div>
                                                <div class="dropdown-item" data-value="medium">Medium</div>
                                                <div class="dropdown-item" data-value="high">High</div>
                                                <div class="dropdown-item" data-value="ultra">Ultra</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">FPS Limit</div>
                                        <div class="number-input-wrapper">
                                            <input type="number" class="custom-input custom-number-input" value="60" min="30" max="240">
                                            <div class="number-controls">
                                                <button class="number-btn number-up" type="button">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                        <polyline points="18 15 12 9 6 15"></polyline>
                                                    </svg>
                                                </button>
                                                <button class="number-btn number-down" type="button">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">V-Sync</div>
                                        <label class="checkbox-container">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="setting-item">
                                        <div class="setting-label">Anti-Aliasing</div>
                                        <label class="checkbox-container">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Combat Tab (Empty) -->
                            <div class="tab-content" data-content="combat">
                                <div class="section-header">Combat Settings</div>
                                <div class="empty-tab">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="m7.048 13.406l3.535 3.536l-1.413 1.414l1.415 1.415l-1.414 1.414l-2.475-2.475l-2.829 2.829l-1.414-1.414l2.829-2.83l-2.475-2.474l1.414-1.414l1.414 1.413zM3 3l3.546.003l11.817 11.818l1.415-1.414l1.415 1.414l-2.475 2.475l2.828 2.829l-1.414 1.414l-2.829-2.829l-2.474 2.475l-1.415-1.414l1.414-1.415L3.002 6.531zm14.457 0L21 3.003l.002 3.523l-4.053 4.052l-3.536-3.535z"/></svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>

                            <!-- Visual Tab (Empty) -->
                            <div class="tab-content" data-content="visual">
                                <div class="section-header">Visual Settings</div>
                                <div class="empty-tab">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>

                            <!-- Player Tab (Empty) -->
                            <div class="tab-content" data-content="player">
                                <div class="section-header">Player Settings</div>
                                <div class="empty-tab">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>

                            <!-- Misc Tab (Empty) -->
                            <div class="tab-content" data-content="misc">
                                <div class="section-header">Miscellaneous</div>
                                <div class="empty-tab">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>

                            <!-- Info Tab (Empty) -->
                            <div class="tab-content" data-content="info">
                                <div class="section-header">Information</div>
                                <div class="empty-tab">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 12 12"><path fill="currentColor" d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0m-5.5.5V8a.5.5 0 0 0 1 0V6.5a.5.5 0 0 0-1 0M6 3.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5"/></svg>
                                    <p>Coming soon...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $("body").append(menuHTML);
        return $("#game-menu");
    }

    private setupButtons() {
        const closeBtn = this.menuElement.find(".close");
        
        closeBtn.on("click", (e) => {
            e.stopPropagation();
            console.log("Close button clicked");
            this.hide();
        });

        $("#game-reset").on("click", () => {
            console.log("Reset to default settings");
            // Здесь можно добавить логику сброса настроек
        });

        $("#game-exit").on("click", () => {
            console.log("Exit game");
            this.hide();
            // Здесь можно добавить логику выхода из игры
        });
        
        // Предотвращаем всплытие кликов из контента
        this.menuElement.find(".game-menu-content").on("click", (e) => {
            e.stopPropagation();
        });
    }

    private setupInteractions() {
        // Tab switching - прямое назначение обработчика
        const sidebarItems = this.menuElement.find(".sidebar-item");
        
        sidebarItems.each(function() {
            $(this).off("click").on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const tab = $(this).data("tab");
                
                $("#game-menu .sidebar-item").removeClass("active");
                $(this).addClass("active");
                
                $("#game-menu .tab-content").removeClass("active");
                $(`#game-menu .tab-content[data-content="${tab}"]`).addClass("active");
                
                // Hide search results when switching tabs
                $(".search-results-wrapper").hide();
                $(".search-input").val("");
            });
        });

        // Sliders - простая версия без lerp (smooth sliders инициализируются отдельно)
        $(document).off("input", ".custom-slider").on("input", ".custom-slider", function() {
            const value = $(this).val();
            $(this).siblings(".slider-value").text(value + "%");
        });

        // Color pickers
        $(document).off("input", "#game-menu .color-input").on("input", "#game-menu .color-input", function() {
            const color = $(this).val();
            $(this).siblings(".color-hex").val(color as string);
        });

        // Number input custom buttons
        this.menuElement.find(".number-up").each(function() {
            $(this).off("click").on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const input = $(this).closest(".number-input-wrapper").find("input[type='number']");
                const currentVal = parseInt(input.val() as string) || 0;
                const max = parseInt(input.attr("max") || "999");
                
                if (currentVal < max) {
                    input.val(currentVal + 1);
                }
            });
        });

        this.menuElement.find(".number-down").each(function() {
            $(this).off("click").on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const input = $(this).closest(".number-input-wrapper").find("input[type='number']");
                const currentVal = parseInt(input.val() as string) || 0;
                const min = parseInt(input.attr("min") || "0");
                
                if (currentVal > min) {
                    input.val(currentVal - 1);
                }
            });
        });

        // Search functionality with dropdown
        const searchInput = this.menuElement.find(".search-input");
        const searchClear = this.menuElement.find(".search-clear");
        const searchWrapper = $(".search-results-wrapper");
        const searchContent = $(".search-results-content");

        searchInput.off("input").on("input", function() {
            const searchTerm = $(this).val() as string;
            const lowerSearch = searchTerm.toLowerCase();
            
            // Show/hide clear button
            if (searchTerm.length > 0) {
                searchClear.css("display", "flex");
            } else {
                searchClear.hide();
                searchWrapper.hide();
                return;
            }
            
            // Clear previous results
            searchContent.empty();
            
            let foundCount = 0;
            
            // Tab icons map
            const tabIcons: { [key: string]: string } = {
                main: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62c.16-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Z"/></svg>',
                combat: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m7.048 13.406l3.535 3.536l-1.413 1.414l1.415 1.415l-1.414 1.414l-2.475-2.475l-2.829 2.829l-1.414-1.414l2.829-2.83l-2.475-2.474l1.414-1.414l1.414 1.413zM3 3l3.546.003l11.817 11.818l1.415-1.414l1.415 1.414l-2.475 2.475l2.828 2.829l-1.414 1.414l-2.829-2.829l-2.474 2.475l-1.415-1.414l1.414-1.415L3.002 6.531zm14.457 0L21 3.003l.002 3.523l-4.053 4.052l-3.536-3.535z"/></svg>',
                visual: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>',
                player: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>',
                misc: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg>',
                info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12"><path fill="currentColor" d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0m-5.5.5V8a.5.5 0 0 0 1 0V6.5a.5.5 0 0 0-1 0M6 3.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5"/></svg>'
            };
            
            // Search through all setting items in all tabs
            const allItems = $("#game-menu .tab-content .setting-item");
            
            allItems.each(function() {
                const label = $(this).find(".setting-label").text().toLowerCase();
                const tabName = $(this).closest(".tab-content").data("content");
                
                if (label.includes(lowerSearch)) {
                    foundCount++;
                    const resultItem = $('<div class="search-result-item"></div>');
                    
                    // Add tab icon
                    if (tabName && tabIcons[tabName]) {
                        const iconWrapper = $('<span class="search-result-icon"></span>');
                        iconWrapper.html(tabIcons[tabName]);
                        resultItem.append(iconWrapper);
                    }
                    
                    // Add content (only label, no group)
                    const contentDiv = $('<div class="search-result-content"></div>');
                    contentDiv.append(`<div class="search-result-label">${$(this).find(".setting-label").text()}</div>`);
                    
                    resultItem.append(contentDiv);
                    
                    // Add click handler to navigate to setting
                    resultItem.on("click", function() {
                        // Switch to correct tab
                        $("#game-menu .sidebar-item").removeClass("active");
                        $(`#game-menu .sidebar-item[data-tab="${tabName}"]`).addClass("active");
                        $("#game-menu .tab-content").removeClass("active");
                        $(`#game-menu .tab-content[data-content="${tabName}"]`).addClass("active");
                        
                        // Close search
                        searchWrapper.hide();
                        searchInput.val("");
                        searchClear.hide();
                    });
                    
                    // Set animation delay dynamically (start after panel opens)
                    resultItem.css('animation-delay', `${0.5 + (foundCount * 0.05)}s`);
                    
                    searchContent.append(resultItem);
                }
            });
            
            if (foundCount > 0) {
                searchWrapper.show();
            } else {
                searchContent.html('<div class="no-results">No settings found</div>');
                searchWrapper.show();
            }
        });

        // Clear search button
        searchClear.off("click").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            searchInput.val("").focus();
            searchClear.hide();
            searchWrapper.hide();
        });
        
        // Close search results when clicking outside
        $(document).off("click.searchClose").on("click.searchClose", (e) => {
            if (!$(e.target).closest(".header-search").length) {
                searchWrapper.hide();
            }
        });

        // Custom Dropdown functionality
        this.setupDropdown();
    }

    private setupDropdown() {
        // Используем .each() для работы со всеми dropdown'ами
        this.menuElement.find(".custom-dropdown-wrapper").each((index, wrapper) => {
            const $wrapper = $(wrapper);
            const dropdownButton = $wrapper.find(".custom-dropdown-button");
            const dropdownMenu = $wrapper.find(".dropdown-menu");
            const dropdownItems = $wrapper.find(".dropdown-item");
            let focusedIndex = -1;

            // Set animation delay for each item dynamically
            dropdownItems.each((i, el) => {
                $(el).css('animation-delay', `${(i + 1) * 0.02}s`);
            });

            // Toggle dropdown on button click
            dropdownButton.off("click").on("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = dropdownMenu.is(":visible");
                
                if (isOpen) {
                    // Close dropdown
                    dropdownMenu.addClass("closing");
                    setTimeout(() => {
                        dropdownMenu.hide().removeClass("closing");
                        dropdownButton.removeClass("active");
                    }, 150);
                } else {
                    // Open dropdown
                    dropdownMenu.show();
                    dropdownButton.addClass("active");
                    focusedIndex = -1;
                }
            });

            // Handle item selection
            dropdownItems.each(function() {
                $(this).off("click").on("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const value = $(this).data("value");
                    const label = $(this).text();
                    
                    // Update button text
                    dropdownButton.find(".dropdown-selected").text(label);
                    
                    // Update selected state
                    dropdownItems.removeClass("selected");
                    $(this).addClass("selected");
                    
                    // Close dropdown
                    dropdownMenu.addClass("closing");
                    setTimeout(() => {
                        dropdownMenu.hide().removeClass("closing");
                        dropdownButton.removeClass("active");
                    }, 150);
                });
            });

            // Hover effect for keyboard navigation
            dropdownItems.on("mouseenter", function() {
                focusedIndex = dropdownItems.index(this);
                dropdownItems.removeClass("focused");
                $(this).addClass("focused");
            });
        });

        // Keyboard navigation (глобальный обработчик)
        $(document).off("keydown.dropdown").on("keydown.dropdown", (e) => {
            const openDropdown = this.menuElement.find(".dropdown-menu:visible");
            if (openDropdown.length === 0) return;
            
            const dropdownItems = openDropdown.find(".dropdown-item");
            const dropdownButton = openDropdown.siblings(".custom-dropdown-button");
            let focusedIndex = dropdownItems.filter(".focused").index();
            
            if (e.key === "Escape") {
                e.preventDefault();
                openDropdown.addClass("closing");
                setTimeout(() => {
                    openDropdown.hide().removeClass("closing");
                    dropdownButton.removeClass("active");
                }, 150);
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                focusedIndex = focusedIndex < dropdownItems.length - 1 ? focusedIndex + 1 : 0;
                dropdownItems.removeClass("focused");
                dropdownItems.eq(focusedIndex).addClass("focused");
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                focusedIndex = focusedIndex > 0 ? focusedIndex - 1 : dropdownItems.length - 1;
                dropdownItems.removeClass("focused");
                dropdownItems.eq(focusedIndex).addClass("focused");
            } else if (e.key === "Enter" && focusedIndex >= 0) {
                e.preventDefault();
                dropdownItems.eq(focusedIndex).trigger("click");
            }
        });

        // Close dropdown when clicking outside
        $(document).off("click.dropdown").on("click.dropdown", (e) => {
            if (!$(e.target).closest(".custom-dropdown-wrapper").length) {
                const openDropdown = this.menuElement.find(".dropdown-menu:visible");
                if (openDropdown.length > 0) {
                    const dropdownButton = openDropdown.siblings(".custom-dropdown-button");
                    openDropdown.addClass("closing");
                    setTimeout(() => {
                        openDropdown.hide().removeClass("closing");
                        dropdownButton.removeClass("active");
                    }, 150);
                }
            }
        });
    }

    show() {
        if (this.isActive || this.isAnimating) return;
        
        this.isActive = true;
        this.isAnimating = true;
        console.log("Opening menu...");
        
        // Показываем display до rAF, чтобы браузер успел layout
        this.menuElement.css('display', 'flex');
        
        this.blockGameInteraction();
        
        this.menuElement.on('click', (e) => {
            if ($(e.target).is('#game-menu') && !this.isAnimating) {
                this.hide();
            }
        });
        
        // Двойной rAF: первый — layout, второй — paint
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.menuElement.addClass('menu-open');
                
                // Слушаем только transform (он длиннее) — одно событие
                this.onTransitionEnd(
                    this.menuElement.find('.game-menu-content')[0],
                    'transform',
                    () => {
                        this.isAnimating = false;
                        this.initSmoothScroll();
                        this.initSmoothSliders();
                        console.log("Menu opened, isAnimating reset");
                    }
                );
            });
        });
    }

    hide() {
        if (!this.isActive || this.isAnimating) return;
        
        this.isActive = false;
        this.isAnimating = true;
        console.log("Closing menu...");
        
        this.menuElement.off('click');
        this.menuElement.removeClass('menu-open').addClass('menu-closing');
        
        this.unblockGameInteraction();
        
        // Чистим до конца анимации — пока скрыто, пользователь не видит
        if (this.smoothScroll) {
            this.smoothScroll.destroy();
            this.smoothScroll = null;
        }
        this.cleanupSmoothSliders();
        
        // Слушаем overlay — он заканчивается последним
        this.onTransitionEnd(
            this.menuElement[0],
            'opacity',
            () => {
                this.menuElement.css('display', 'none');
                this.menuElement.removeClass('menu-closing');
                this.isAnimating = false;
                console.log("Menu closed, isAnimating reset");
            }
        );
    }

    /**
     * Утилита: вызывает callback один раз когда завершается
     * анимация конкретного CSS-свойства на элементе.
     * Fallback через setTimeout на случай если transitionend не придёт.
     */
    private onTransitionEnd(el: HTMLElement, property: string, callback: () => void) {
        let called = false;
        
        const done = () => {
            if (called) {
                return;
            };
            called = true;
            el.removeEventListener('transitionend', handler);
            clearTimeout(fallback);
            callback();
        };
        
        const handler = (e: TransitionEvent) => {
            if (e.target === el && e.propertyName === property) {
                done();
            }
        };
        
        // Fallback: duration + 50ms запаса (самая длинная анимация 600ms)
        const fallback = setTimeout(done, 650);

        el.addEventListener('transitionend', handler);
    }

    private blockGameInteraction() {
        // Блокируем canvas игры от получения событий
        const canvas = document.getElementById("cvs") as HTMLCanvasElement;
        if (canvas) {
            canvas.style.pointerEvents = "none";
        }

        // Блокируем игровую область от касаний
        const gameArea = document.getElementById("game-touch-area");
        if (gameArea) {
            gameArea.style.pointerEvents = "none";
        }

        // Добавляем класс для блокировки
        document.body.classList.add("game-menu-open");
    }

    private unblockGameInteraction() {
        // Разблокируем canvas игры
        const canvas = document.getElementById("cvs") as HTMLCanvasElement;
        if (canvas) {
            canvas.style.pointerEvents = "auto";
        }

        // Разблокируем игровую область
        const gameArea = document.getElementById("game-touch-area");
        if (gameArea) {
            gameArea.style.pointerEvents = "auto";
        }

        // Убираем класс блокировки
        document.body.classList.remove("game-menu-open");
    }

    toggle() {
        console.log("GameMenu.toggle() called, isAnimating:", this.isAnimating);
        
        // Prevent toggle during animation
        if (this.isAnimating) {
            console.log("Toggle blocked - animation in progress");
            return;
        }
        
        if (this.isActive) {
            this.hide();
        } else {
            this.show();
        }
    }

    isVisible() {
        return this.isActive;
    }
    
    private initSmoothScroll() {
        const scrollContainer = this.menuElement.find(".modal-body")[0];
        if (scrollContainer) {
            // Destroy existing smooth scroll
            if (this.smoothScroll) {
                this.smoothScroll.destroy();
            }
            
            // Проверяем, не обёрнут ли уже контент
            const existingWrapper = scrollContainer.querySelector(".smooth-scroll-content");
            if (existingWrapper) {
                // Контент уже обёрнут, просто создаём новый экземпляр без пересоздания DOM
                this.smoothScroll = new SmoothScroll(scrollContainer, true);
            } else {
                // Первый раз, создаём wrapper
                this.smoothScroll = new SmoothScroll(scrollContainer, false);
            }
            
            // Reinitialize interactions after smooth scroll wraps content
            setTimeout(() => {
                this.setupDropdown();
                this.setupNumberInputs();
            }, 0);
        }
    }
    
    private setupNumberInputs() {
        // Number input custom buttons
        this.menuElement.find(".number-up").each(function() {
            $(this).off("click").on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const input = $(this).closest(".number-input-wrapper").find("input[type='number']");
                const currentVal = parseInt(input.val() as string) || 0;
                const max = parseInt(input.attr("max") || "999");
                
                if (currentVal < max) {
                    input.val(currentVal + 1);
                }
            });
        });

        this.menuElement.find(".number-down").each(function() {
            $(this).off("click").on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const input = $(this).closest(".number-input-wrapper").find("input[type='number']");
                const currentVal = parseInt(input.val() as string) || 0;
                const min = parseInt(input.attr("min") || "0");
                
                if (currentVal > min) {
                    input.val(currentVal - 1);
                }
            });
        });
    }
    
    private initSmoothSliders() {
        // Cleanup old sliders
        this.cleanupSmoothSliders();
        
        // Find all sliders in smooth-scroll-content
        const sliders = this.menuElement.find(".smooth-scroll-content .custom-slider");
        
        sliders.each((index, element) => {
            const slider = new SmoothSlider(element as HTMLInputElement);
            this.smoothSliders.set(element as HTMLInputElement, slider);
        });
    }
    
    private cleanupSmoothSliders() {
        this.smoothSliders.forEach(slider => slider.destroy());
        this.smoothSliders.clear();
    }
}

// Smooth Scroll Class inspired by smooothy
class SmoothScroll {
    container: HTMLElement;
    current = 0;
    target = 0;
    ease = 0.032; // Более плавный
    rafId: number | null = null;
    isScrolling = false;
    boundOnWheel: (e: WheelEvent) => void;
    
    constructor(container: HTMLElement, skipWrap: boolean = false) {
        this.container = container;
        this.boundOnWheel = this.onWheel.bind(this);
        this.init(skipWrap);
    }
    
    init(skipWrap: boolean) {
        // Disable native scroll
        this.container.style.overflow = "hidden";
        
        if (!skipWrap) {
            // Create scroll content wrapper only if not exists
            const content = this.container.innerHTML;
            this.container.innerHTML = `<div class="smooth-scroll-content">${content}</div>`;
        }
        
        const scrollContent = this.container.querySelector(".smooth-scroll-content") as HTMLElement;
        if (scrollContent) {
            scrollContent.style.transform = "translateY(0)";
            scrollContent.style.willChange = "transform";
            scrollContent.style.paddingBottom = "40px"; // Добавляем padding внизу
        }
        
        // Add wheel event
        this.container.addEventListener("wheel", this.boundOnWheel, { passive: false });
        
        // Start animation loop
        this.update();
    }
    
    onWheel(e: WheelEvent) {
        e.preventDefault();
        
        const scrollContent = this.container.querySelector(".smooth-scroll-content") as HTMLElement;
        if (!scrollContent) return;
        
        const maxScroll = scrollContent.scrollHeight - this.container.clientHeight;
        
        // Update target with wheel delta (уменьшил чувствительность)
        this.target += e.deltaY * 0.32;
        
        // Clamp target
        this.target = Math.max(0, Math.min(this.target, maxScroll));
        
        this.isScrolling = true;
    }
    
    update = () => {
        const scrollContent = this.container.querySelector(".smooth-scroll-content") as HTMLElement;
        if (!scrollContent) return;
        
        // Lerp current to target
        this.current += (this.target - this.current) * this.ease;
        
        // Apply transform
        scrollContent.style.transform = `translateY(-${this.current}px)`;
        
        // Check if still scrolling
        if (Math.abs(this.target - this.current) > 0.1) {
            this.isScrolling = true;
        } else {
            this.current = this.target;
            this.isScrolling = false;
        }
        
        // Continue loop
        this.rafId = requestAnimationFrame(this.update);
    }
    
    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.container.removeEventListener("wheel", this.boundOnWheel);
    }
}

// Smooth Slider Class with lerp animation
class SmoothSlider {
    input: HTMLInputElement;
    valueDisplay: HTMLElement | null;
    current: number;
    target: number;
    rafId: number | null = null;
    ease = 0.15;
    
    constructor(input: HTMLInputElement) {
        this.input = input;
        this.valueDisplay = input.parentElement?.querySelector('.slider-value') as HTMLElement;
        this.current = parseFloat(input.value);
        this.target = this.current;
        
        this.init();
    }
    
    init() {
        // Input event
        this.input.addEventListener('input', this.onInput.bind(this));
        
        // Start animation loop
        this.update();
    }
    
    onInput = () => {
        this.target = parseFloat(this.input.value);
    }
    
    update = () => {
        // Lerp current to target
        if (Math.abs(this.target - this.current) > 0.1) {
            this.current += (this.target - this.current) * this.ease;
            
            // Update display
            if (this.valueDisplay) {
                this.valueDisplay.textContent = Math.round(this.current) + '%';
            }
        } else {
            this.current = this.target;
            if (this.valueDisplay) {
                this.valueDisplay.textContent = Math.round(this.current) + '%';
            }
        }
        
        // Continue loop
        this.rafId = requestAnimationFrame(this.update);
    }
    
    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.input.removeEventListener('input', this.onInput);
    }
}
