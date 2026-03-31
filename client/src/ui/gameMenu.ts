import $ from "jquery";

export class GameMenu {
    isActive = false;
    menuElement: JQuery;

    constructor() {
        console.log("GameMenu constructor called");
        // Создаем HTML для игрового меню
        this.menuElement = this.createMenuHTML();
        console.log("Menu element created:", this.menuElement.length);
        
        // Обработчики для кнопок
        this.setupButtons();
        console.log("Buttons setup complete");
        this.setupInteractions();
        console.log("Interactions setup complete");
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
                        
                        <div class="sidebar-item active" data-tab="main" onclick="console.log('Direct click on main tab')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62c.16-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Z"/></svg>
                        </div>
                        <div class="sidebar-item" data-tab="combat" onclick="console.log('Direct click on combat tab')">
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
                                        <select class="custom-dropdown">
                                            <option value="option1">Option 1</option>
                                            <option value="option2" selected>Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select>
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
                                        <input type="number" class="custom-input" value="100" min="0" max="999">
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
        
        closeBtn.on("click", () => {
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

        // Предотвращаем закрытие меню при клике на оверлей
        this.menuElement.on("click", (e) => {
            if (e.target === this.menuElement[0]) {
                // Клик по оверлею - ничего не делаем
                e.stopPropagation();
            }
        });

        // Предотвращаем всплытие событий из контента меню
        this.menuElement.find(".game-menu-content").on("click", (e) => {
            e.stopPropagation();
        });
    }

    private setupInteractions() {
        console.log("setupInteractions called, menuElement:", this.menuElement.length);
        
        // Tab switching - прямое назначение обработчика
        const sidebarItems = this.menuElement.find(".sidebar-item");
        console.log("Found sidebar items:", sidebarItems.length);
        
        sidebarItems.each(function(index) {
            console.log("Setting up click handler for item", index, "with tab:", $(this).data("tab"));
            $(this).off("click").on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const tab = $(this).data("tab");
                console.log("Tab clicked:", tab);
                
                $("#game-menu .sidebar-item").removeClass("active");
                $(this).addClass("active");
                
                $("#game-menu .tab-content").removeClass("active");
                $(`#game-menu .tab-content[data-content="${tab}"]`).addClass("active");
                
                // Hide search results when switching tabs
                $(".search-results-wrapper").hide();
                $(".search-input").val("");
            });
        });

        // Sliders
        $(document).off("input", "#game-menu .custom-slider").on("input", "#game-menu .custom-slider", function() {
            const value = $(this).val();
            $(this).siblings(".slider-value").text(value + "%");
        });

        // Color pickers
        $(document).off("input", "#game-menu .color-input").on("input", "#game-menu .color-input", function() {
            const color = $(this).val();
            $(this).siblings(".color-hex").val(color as string);
        });

        // Search functionality with dropdown
        $(document).off("input", "#game-menu .search-input").on("input", "#game-menu .search-input", function() {
            const searchTerm = $(this).val() as string;
            const lowerSearch = searchTerm.toLowerCase();
            const searchWrapper = $(".search-results-wrapper");
            const searchContent = $(".search-results-content");
            
            console.log("Search term:", searchTerm);
            
            if (searchTerm.length === 0) {
                searchWrapper.hide();
                return;
            }
            
            // Clear previous results
            searchContent.empty();
            
            let foundCount = 0;
            
            // Search through all setting items in active tab
            const allItems = $("#game-menu .tab-content.active .setting-item");
            console.log("Found items:", allItems.length);
            
            allItems.each(function() {
                const label = $(this).find(".setting-label").text().toLowerCase();
                const groupTitle = $(this).closest(".setting-group").find(".group-title").text();
                
                console.log("Checking label:", label, "against:", lowerSearch);
                
                if (label.includes(lowerSearch)) {
                    foundCount++;
                    const clonedItem = $(this).clone();
                    
                    // Add group context if exists
                    if (groupTitle) {
                        clonedItem.prepend(`<div class="search-result-group">${groupTitle}</div>`);
                    }
                    
                    searchContent.append(clonedItem);
                }
            });
            
            console.log("Found count:", foundCount);
            
            if (foundCount > 0) {
                searchWrapper.css("display", "block");
                searchWrapper.show();
            } else {
                searchContent.html('<div class="no-results">No settings found</div>');
                searchWrapper.css("display", "block");
                searchWrapper.show();
            }
        });
        
        // Close search results when clicking outside
        $(document).off("click.searchClose").on("click.searchClose", (e) => {
            if (!$(e.target).closest(".header-search, .search-results-wrapper").length) {
                $(".search-results-wrapper").hide();
            }
        });
    }

    show() {
        if (!this.isActive) {
            this.isActive = true;
            this.menuElement.fadeIn(200);
            
            // Блокируем взаимодействие с игрой
            this.blockGameInteraction();
        }
    }

    hide() {
        if (this.isActive) {
            this.isActive = false;
            this.menuElement.fadeOut(200);
            
            // Разблокируем взаимодействие с игрой
            this.unblockGameInteraction();
        }
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
        if (this.isActive) {
            this.hide();
        } else {
            this.show();
        }
    }

    isVisible() {
        return this.isActive;
    }
}
