


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
	render: function(){
		return(
			<div className="proyecto">
			    <figure className="proyectoImg" style={{backgroundImage: 'url(img/proyectos/'+ this.props.data.image + ')'}} >
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
			        <button onClick={this.followerManagement} className={this.props.data.following ? 'followBtn active' : 'followBtn'}> <span className="glyphicon glyphicon-star"></span></button>
			    </div>
			    
			</div>
		);
	}
});

var Projects = React.createClass({
	getInitialState: function(){
		return { proyects: this.props.data } 
	},
	followProject: function(index){
		if (this.state.proyects[index].following) {

			this.state.proyects[index].following = false;
			this.state.proyects[index].followers--;
		}else{
			this.state.proyects[index].following = true;
			this.state.proyects[index].followers++;
		}
		
	},
	render: function(){
		var followProject = this.followProject;
		return (
			<div className="proyectosContainer">
				{ this.state.proyects.map(function(el, index){return <Project key={index} followProject={followProject} index={index} data={el}/> })}
			</div>
		)
	}
})

var ProyectGroup = React.createClass({
	render: function(){
		var sectionId = this.props.sectionIndex;
		return (
			<article className="seccionProyecto" id={this.props.sectionId}> >

				<h3 className="proyectosTitle">
                        <span className={this.props.iconClass} aria-hidden="true"></span> {this.props.sectionName}
                </h3>
				<Projects data={ this.props.data.filter(function(el, index){return el.category == sectionId }) } />

			</article>
		)
	}
})

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
	   		$(this).toggleClass('active');;
	   	}

	   	function scrollToSection(e) {
	   		var sectionId = $(this).attr('data-section');
	   		var targetSection = $("#"+sectionId);

	   		$body.animate({
	             scrollTop: targetSection.offset().top - 55
	           }, 500);
	   	}
	},
  render: function(){
        return(
        	<div>
        		<ProyectGroup  data={proyectsDB} sectionId="proyectosNuevos" sectionName="Proyectos nuevos" iconClass="glyphicon glyphicon-fire" sectionIndex="0" />
        		<ProyectGroup  data={proyectsDB} sectionId="fondeadosSegunda" sectionName="Fondeados en 2da Ronda" iconClass="glyphicon glyphicon glyphicon-ok" sectionIndex="1" />
        		<ProyectGroup  data={proyectsDB} sectionId="proyectosExitosos" sectionName="Proyectos exitosos" iconClass="glyphicon glyphicon-usd" sectionIndex="2" />
        		<ProyectGroup  data={proyectsDB} sectionId="proyectosFuturos" sectionName="Proyectos Futuros" iconClass="glyphicon glyphicon-flag" sectionIndex="3" />
        	</div>
        	)
  }
});



ReactDOM.render(<ProjectsApp />, document.getElementById('proyectsApp'));