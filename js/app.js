


var Project = React.createClass({

	calculatePercentage: function(current){
		var min = 100;
		var max = this.props.data.goal;
		var percentage = ((current - min) * 100) / (max - min);
		return percentage;
	},
	followerManagement: function(){
		var index = this.props.index;
		this.props.followProject(index)
	},
	projectClick: function(){

		this.props.onClick(this.props.data.id)
	},
	render: function(){
		var projectClass = 'proyecto';
		if(this.props.data.fondeado){
			projectClass += ' fondeado';
		}
		if(this.props.data.activo){
			projectClass += ' activo';
		}

		return(
			<div className={projectClass} >
			    <figure className="proyectoImg" style={{backgroundImage: 'url(img/proyectos/'+ this.props.data.image + ')'}} onClick={this.projectClick}>
			        <div className="hoverMask">Ver mas</div>
			    </figure>

			    <h4 className="proyectoTitle">{this.props.data.name}</h4>
			    <p className="proyectoDescription">{this.props.data.description}</p>

			    <div className="proyectoDetails">
			        
			        <div className="progresoMeta">
			            <div className="progreso" style={{ width: this.calculatePercentage(this.props.data.currentMoney) + "%" }} ></div>
			        </div>
			        <p className="theMoney juntado">Ha juntado <span className="dinero">{this.props.data.currentMoney}</span></p>
			        <p className="theMoney meta">Meta <span className="dinero">{this.props.data.goal}</span></p>

			        <div className="equity">Porcentaje<span className="equityQty">{this.props.data.equity}</span></div>
			        
			        <div className="remainingDays">Dias Restantes <span className="days">37</span></div>
			    </div>

			    <div className="followSection">
			        <div className="followers"> {this.props.data.followers} seguidores </div>
			        <button  className={this.props.data.following ? 'followBtn active' : 'followBtn'}> <span className="glyphicon glyphicon-star"></span></button>
			    </div>
			    
			</div>
		);
	}
});

var Projects = React.createClass({
	

	render: function(){
		var showProjectInfo = this.props.showProjectInfo;
		return (
			<div className="proyectosContainer">
				{ this.props.data.map(function(el, index){return <Project key={el.id} onClick={showProjectInfo} index={index} data={el}/> })}
			</div>
		)
	}
});


var ProjectGroup = React.createClass({
	render: function(){
		var sectionId = this.props.sectionIndex;
		return (
			<article className="seccionProyecto" id={this.props.sectionId}> 

				<h3 className="proyectosTitle">
                    <span className={this.props.iconClass} aria-hidden="true"></span> {this.props.sectionName}
                </h3>
				<Projects showProjectInfo={this.props.showProjectInfo} data={this.props.projectsFiltered} />

			</article>
		)
	}
});


var ProjectInfo = React.createClass({
	componentDidMount: function() {
	      console.log(this.props.name)
	},
	render: function(){
		var iframeSRC = 'https://www.youtube.com/embed/' + this.props.video + '?autoplay=1';
		return(
			<article className={this.props.active ? 'barContainer visible' : 'barContainer hidden'}>
				<iframe width="100%" height="40%" src={iframeSRC} frameborder="0" allowfullscreen></iframe>
				<h3> {this.props.name} </h3>
				<h6>Amigos siguiendo</h6>
				<div className="amigos">
					<figure className="amigo1">
						<figcaption> Pedro Zamora</figcaption>
					</figure>
					<figure className="amigo2">
						<figcaption> Pablo Ramirez</figcaption>
					</figure>
					<figure className="amigo3">
						<figcaption> Toño Bravo</figcaption>
					</figure>
				</div>
				<button className="verProyecto"> Ver Proyecto </button>
			</article>
		)
	}
})


var ProjectsPanels = React.createClass({

	getInitialState: function() {
	    return {
	        projects : this.props.data,
	        showProjectInfo : this.showProjectInfo,
	        projectActive : false,
			activeProjectId : 0,
			activeProjectData : this.props.data[0]
	    };
	},

	showProjectInfo: function(projectId){
		var projectSelected = this.state.projects.filter(function(el, index){return el.id == projectId });
		this.setState({
			projectActive : true,
			activeProjectId : projectId,
			activeProjectData : projectSelected[0]
		})
		
		
	},
	render: function(){
		
		return(

        	<div id="panels" className={this.state.projectActive ? 'secondaryPanelActive' : ''}>
	        	<ProjectsNavBar />
	        	<section className="layoutPanel primaryPanel" id="proyectsApp">

        	    	<ProjectGroup  projectsFiltered={ this.state.projects.filter(function(el, index){return el.category == 0 }) } showProjectInfo={this.showProjectInfo} sectionId="proyectosNuevos" sectionName="Proyectos nuevos" iconClass="glyphicon glyphicon-fire"  />
        	    	<ProjectGroup  projectsFiltered={ this.state.projects.filter(function(el, index){return el.category == 1 }) } showProjectInfo={this.showProjectInfo} sectionId="fondeadosSegunda" sectionName="Fondeados en 2da Ronda" iconClass="glyphicon glyphicon-ok"  />
        	    	<ProjectGroup  projectsFiltered={ this.state.projects.filter(function(el, index){return el.category == 2 }) } showProjectInfo={this.showProjectInfo} sectionId="proyectosExitosos" sectionName="Proyectos exitosos" iconClass="glyphicon glyphicon-usd"  />
        	    	<ProjectGroup  projectsFiltered={ this.state.projects.filter(function(el, index){return el.category == 3 }) } showProjectInfo={this.showProjectInfo} sectionId="proyectosFuturos" sectionName="Proyectos Futuros" iconClass="glyphicon glyphicon-flag"  />

	        	</section>
	        	<section className="layoutPanel secondaryPanel" data-53="top:109px; height: calc(100% - 109px);" data-54="top: 55px; height: calc(100% - 55px) ;">
	        	    <ProjectInfo active={this.state.projectActive} name={this.state.activeProjectData.name} video={this.state.activeProjectData.video} goal={this.state.activeProjectData.goal} />
	        	</section>
        		
        	</div>

		);
	}

});

var ProjectsNavBar = React.createClass({
	render: function(){
		return(
				<nav id="proyectosNav" data-53="position:absolute;" data-54="position: fixed;">
				    <h2 className="pageTitle pull-left">Proyectos</h2>
				    <ul className="proyectosMenu pull-right">
				        <li className="btn" data-section="proyectosNuevos"><span className="glyphicon glyphicon-fire" aria-hidden="true"></span> Proyectos nuevos</li>
				        <li className="btn" data-section="fondeadosSegunda"><span className="glyphicon glyphicon glyphicon-ok" aria-hidden="true"></span> Fondeados en 2da Ronda</li>
				        <li className="btn" data-section="proyectosExitosos"><span className="glyphicon glyphicon-usd" aria-hidden="true"></span> Proyectos exitosos</li>
				        <li className="btn" data-section="proyectosFuturos"><span className="glyphicon glyphicon-flag" aria-hidden="true"></span> Proyectos Futuros</li>
				    </ul>
				</nav>
			);
	}
});


var ProjectsApp = React.createClass({


	componentDidMount :function() {

	   	// Listeners
	   	$('.proyectoImg').click(openDetails);
	   	$('.followBtn').click(followProyect);
	   	$('.proyectosMenu').on('click', '.btn', scrollToSection);

	   	var $body = $('html, body');

	   	function openDetails(e) {
	   		$('.proyecto').removeClass('active');
	   		$('#mainApp').addClass('secondaryPanelActive');
	   		$(this).parent().addClass('active');
	   	}

	   	function followProyect(e) {
	   		$(this).toggleClass('active');
	   	}

	   	function scrollToSection(e) {
	   		var sectionId = $(this).attr('data-section');
	   		var targetSection = $("#"+sectionId);

	   		$body.animate({
	             scrollTop: targetSection.offset().top - 55
	           }, 500);
	   	}

	   	var s = skrollr.init();
	},

	render: function(){
	return(
			<ProjectsPanels data={proyectsDB} />
		)
	}

});



ReactDOM.render(<ProjectsApp />, document.getElementById('mainApp'));